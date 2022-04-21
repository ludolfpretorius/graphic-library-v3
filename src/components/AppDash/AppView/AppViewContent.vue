<template>
    <div id="AppViewContent" ref="content">
        <AppViewContentDropzone />
        <AppViewContentThumbnail
            v-show="filteredImages.length"
            v-for="img in visibleImages"
            :key="img.id"
            :img="img" />

        <AppViewContentLoader v-show="!allImages.length" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppViewContentDropzone from './AppViewContentDropzone'
import AppViewContentThumbnail from './AppViewContentThumbnail'
import AppViewContentLoader from './AppViewContentLoader'

export default {
    name: 'AppViewContent',
    components: {
        AppViewContentDropzone,
        AppViewContentThumbnail,
        AppViewContentLoader
    },
    data() {
        return {
            visibleImages: []
        }
    },
    computed: {
        ...mapGetters(['allImages', 'filteredImages'])
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
                this.visibleImages = [...this.visibleImages, ...newImages]
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
            })
        },
        scrollToTop() {
            const content = this.$refs.content
            content.scroll(0, 0)
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
        this.imagesRequest('fetchAll')
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
