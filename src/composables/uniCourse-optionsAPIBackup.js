// import { mapGetters, mapActions } from 'vuex'
// computed: mapGetters([
    //     'filter',
    //     'allImages',
    //     'filteredImages',
    //     'visibleImages',
    //     'universities',
    //     'universityNames',
    //     'courses'
    // ]),
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