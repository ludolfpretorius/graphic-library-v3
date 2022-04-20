<template>
    <div id="AppViewSearch">
        <AppViewSearchSelect
            :search="'uni'"
            :options="universityNames"
            :placeholder="'Select UP'"
            @updateFilter="updateUni">
            <i className="fas fa-university"></i>
        </AppViewSearchSelect>

        <AppViewSearchSelect
            ref="courseInput"
            :search="'course'"
            :options="courses"
            :placeholder="'Select Course'"
            @updateFilter="updateCourse">
            <i className="fas fa-graduation-cap"></i>
        </AppViewSearchSelect>

        <AppViewSearchInput :search="'keyword'" @updateFilter="updateKeyword" />

        <div className="asset-amount">{{ filteredImages.length }} images</div>
    </div>
</template>

<script>
import { mapGetters, useStore } from 'vuex'
import AppViewSearchSelect from './AppViewSearchSelect'
import AppViewSearchInput from './AppViewSearchInput'

import { ref } from 'vue'

export default {
    name: 'AppViewSearch',
    components: {
        AppViewSearchSelect,
        AppViewSearchInput
    },
    computed: mapGetters([
        'filter',
        'allImages',
        'filteredImages',
        'visibleImages',
        'universities',
        'universityNames',
        'courses'
    ]),
    setup() {
        const store = useStore()
        const courseInput = ref(null)

        const updateUni = (dataObj) => {
            updateFilter(dataObj)
            callFilterImages()
            store.dispatch('setCourses', dataObj.value || '')
            clearCourseInput()
        }

        const updateCourse = (dataObj) => {
            updateFilter(dataObj)
            callFilterImages()
        }

        const updateKeyword = (dataObj) => {
            updateFilter(dataObj)
            callFilterImages()
        }

        const updateFilter = (dataObj) => {
            const filter = store.getters.filter
            filter[dataObj.search] = dataObj.value || ''
            if (!filter.uni.length) {
                filter.course = ''
            }
            store.dispatch('setFilter', filter)
        }

        const callFilterImages = () => {
            const locallyFilteredImages = filterImages(
                store.getters.filter,
                store.getters.allImages
            )
            store.dispatch('setFilteredImages', locallyFilteredImages)
        }

        const filterImages = (filterObj, imgsArr) => {
            const regex = new RegExp(filterObj.keyword, 'ig')
            const imgs = imgsArr.filter((img) => {
                const tags = img.tags.join(',')
                return (
                    tags.match(regex) &&
                    img.up.includes(filterObj.uni) &&
                    img.course.includes(filterObj.course)
                )
            })
            return imgs
        }

        const clearCourseInput = () => {
            const elem = courseInput.value
            console.log()
            elem.$refs.multiselect.clear()
        }

        return {
            courseInput,
            updateUni,
            updateCourse,
            updateKeyword,
            updateFilter,
            callFilterImages,
            filterImages
        }
    }
    // methods: {
    //     ...mapActions(['setFilter', 'setFilteredImages', 'setCourses']),
    //     updateUni(dataObj) {
    //         this.updateFilter(dataObj)
    //         this.callFilterImages()
    //         this.setCourses(dataObj.value || '')
    //         this.clearCourseInput()
    //     },
    //     updateCourse(dataObj) {
    //         this.updateFilter(dataObj)
    //         this.callFilterImages()
    //     },
    //     updateKeyword(dataObj) {
    //         this.updateFilter(dataObj)
    //         this.callFilterImages()
    //     },
    //     updateFilter(dataObj) {
    //         const filter = this.filter
    //         filter[dataObj.search] = dataObj.value || ''
    //         if (!filter.uni.length) {
    //             filter.course = ''
    //         }
    //         this.setFilter(filter)
    //     },
    //     callFilterImages() {
    //         const locallyFilteredImages = this.filterImages(
    //             this.filter,
    //             this.allImages
    //         )
    //         this.setFilteredImages(locallyFilteredImages)
    //     },
    //     filterImages(filterObj, imgsArr) {
    //         const regex = new RegExp(filterObj.keyword, 'ig')
    //         const imgs = imgsArr.filter((img) => {
    //             const tags = img.tags.join(',')
    //             return (
    //                 tags.match(regex) &&
    //                 img.up.includes(filterObj.uni) &&
    //                 img.course.includes(filterObj.course)
    //             )
    //         })
    //         return imgs
    //     },
    //     clearCourseInput() {
    //         const courseInput = this.$refs.courseInput
    //         courseInput.$refs.multiselect.clear()
    //     }
    // }
}
</script>

<style scoped lang="scss">
#AppViewSearch {
    height: 100px;
    width: 100%;
    padding: 0 40px;
    background-color: #fff;
    box-shadow: $boxShadowMid;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1;
    .asset-amount {
        color: #aaa;
        margin: 0 10px;
    }
}
</style>
