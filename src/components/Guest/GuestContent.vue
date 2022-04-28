<template>
    <div id="GuestContent" ref="content">
        <AppViewContentScrolltop
            :show="scrolltopIsVisible"
            @click="scrollToTop" />
        <GuestContentThumbnail
            v-show="filteredGuestImages.length"
            v-for="img in visibleImages"
            :key="img.id"
            :img="img" />
        <AppViewContentTextLoader
            v-show="
                allGuestImages.length &&
                visibleImages.length < filteredGuestImages.length
            " />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppViewContentScrolltop from '@/components/AppDash/AppView/AppViewContentScrolltop'
import GuestContentThumbnail from './GuestContentThumbnail'
import AppViewContentTextLoader from '@/components/AppDash/AppView/AppViewContentTextLoader'

export default {
    name: 'GuestContent',
    components: {
        AppViewContentScrolltop,
        GuestContentThumbnail,
        AppViewContentTextLoader
    },
    data() {
        return {
            visibleImages: [],
            scrolltopIsVisible: false
        }
    },
    computed: mapGetters(['allGuestImages', 'filteredGuestImages']),
    methods: {
        ...mapActions(['guestRequest', 'setPopup', 'setImgToEdit']),
        loadMoreImages(amount = 100) {
            if (this.visibleImages.length < this.filteredGuestImages.length) {
                const index = this.visibleImages.length
                const newImages = this.filteredGuestImages.slice(
                    index,
                    index + amount
                )
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
        }
    },
    watch: {
        filteredGuestImages() {
            this.visibleImages = []
            this.scrollToTop()
            this.loadMoreImages(50)
        }
    },
    mounted() {
        this.listenForScrolling()
    }
}
</script>

<style scoped lang="scss">
#GuestContent {
    height: calc(100% - 140px);
    padding: 40px;
    background-color: $backgroundGrey;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    position: fixed;
    top: 140px;
    overflow-y: auto;
}
</style>
