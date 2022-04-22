<template>
    <div id="AppViewContent" ref="content">
        <AppViewContentLoader :absolute="true" v-show="!allImages.length" />
        <AppViewContentScrolltop
            :show="scrolltopIsVisible"
            @click="scrollToTop" />
        <AppViewContentDropzone />
        <AppViewContentThumbnail
            v-show="filteredImages.length"
            v-for="img in computedVisibleImages"
            :key="img.id"
            :img="img"
            @toggleVSGOfficial="toggleVSGOfficial"
            @deleteImage="deleteImage" />
        <AppViewContentTextLoader
            v-show="
                allImages.length && visibleImages.length < filteredImages.length
            " />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppViewContentLoader from './AppViewContentLoader'
import AppViewContentScrolltop from './AppViewContentScrolltop'
import AppViewContentDropzone from './AppViewContentDropzone'
import AppViewContentThumbnail from './AppViewContentThumbnail'
import AppViewContentTextLoader from './AppViewContentTextLoader'

export default {
    name: 'AppViewContent',
    components: {
        AppViewContentLoader,
        AppViewContentScrolltop,
        AppViewContentDropzone,
        AppViewContentThumbnail,
        AppViewContentTextLoader
    },
    data() {
        return {
            visibleImages: [],
            scrolltopIsVisible: false
        }
    },
    computed: {
        ...mapGetters(['allImages', 'filteredImages']),
        computedVisibleImages() {
            return this.visibleImages
        }
    },
    methods: {
        ...mapActions(['imagesRequest']),
        loadMoreImages(amount = 100) {
            if (this.visibleImages.length < this.filteredImages.length) {
                const index = this.visibleImages.length
                const newImages = this.filteredImages.slice(
                    index,
                    index + amount
                )
                // this.visibleImages = [...this.visibleImages, ...newImages]
                this.visibleImages.push(...newImages)
            }
        },
        listenForScrolling() {
            const content = this.$refs.content
            content.addEventListener('scroll', (event) => {
                const elem = event.target
                if (
                    elem.scrollTop + elem.clientHeight >=
                    elem.scrollHeight - 400
                ) {
                    this.loadMoreImages(100)
                }
                this.showScrolltopButton(elem)
            })
        },
        scrollToTop() {
            const content = this.$refs.content
            content.scroll(0, 0)
        },
        showScrolltopButton(elem) {
            const scrollTop = elem.pageYOffset || elem.scrollTop
            if (scrollTop > 1000) {
                this.scrolltopIsVisible = true
            } else {
                this.scrolltopIsVisible = false
            }
        },
        toggleVSGOfficial(img) {
            this.imagesRequest({ endpoint: 'toggleVSGOfficial', data: img })
        },
        deleteImage(img) {
            this.imagesRequest({ endpoint: 'deleteImage', data: img })
        }
    },
    watch: {
        filteredImages() {
            this.visibleImages = []
            this.scrollToTop()
            this.loadMoreImages(50)
        }
    },
    created() {
        this.imagesRequest({ endpoint: 'fetchAll' })
    },
    mounted() {
        this.listenForScrolling()
    }
}
</script>

<style scoped lang="scss">
#AppViewContent {
    height: calc(100% - 102px);
    padding: 40px;
    background-color: $backgroundGrey;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    overflow-y: auto;
}
</style>
