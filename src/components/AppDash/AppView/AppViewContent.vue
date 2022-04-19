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
        loadMoreImages() {
            if (
                this.filteredImages.length &&
                this.visibleImages.length < this.filteredImages.length
            ) {
                const startIndex = this.visibleImages.length
                const endIndex = this.visibleImages.length + 100
                const newImages = this.filteredImages.slice(
                    startIndex,
                    endIndex
                )
                this.visibleImages = [...this.visibleImages, ...newImages]
            }
        }
    },
    created() {
        this.imagesRequest('fetchAll')
    },
    mounted() {
        const content = this.$refs.content
        content.addEventListener('scroll', (event) => {
            const elem = event.target
            if (elem.scrollTop + elem.clientHeight >= elem.scrollHeight - 400) {
                this.loadMoreImages()
            }
        })
    },
    updated() {
        if (this.filteredImages.length && !this.visibleImages.length) {
            this.loadMoreImages()
        }
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
