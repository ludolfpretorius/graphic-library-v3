import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const uniCourseSelectFunctionality = (options = { filterImages: true }) => {
    const store = useStore()
    const courseInput = ref(null)
    const universityNames = computed(() => {
        return store.getters.universityNames
    })
    const courses = computed(() => {
        return store.getters.courses
    })
    const filteredImages = computed(() => {
        return store.getters.filteredImages
    })

    const updateUni = (dataObj) => {
        if (options.filterImages) {
            updateFilter(dataObj)
            callFilterImages()
        }
        store.dispatch('setCourses', dataObj.value || '')
        clearCourseInput()
    }

    const clearCourseInput = () => {
        const elem = courseInput.value
        elem.$refs.multiselect.clear()
    }

    if (!options.filterImages) {
        return {
            courseInput,
            universityNames,
            updateUni,
            courses
        }
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

    return {
        courseInput,
        updateUni,
        updateCourse,
        updateKeyword,
        universityNames,
        courses,
        filteredImages
    }
}

export default uniCourseSelectFunctionality
