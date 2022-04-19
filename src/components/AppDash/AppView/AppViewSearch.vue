<template>
    <div id="AppViewSearch">
        <AppViewSearchSelect
            :search="'uni'"
            :options="options"
            :placeholder="'Select UP'"
            @updateFilter="updateFilter">
            <i className="fas fa-university"></i>
        </AppViewSearchSelect>

        <AppViewSearchSelect
            :search="'course'"
            :options="options"
            :placeholder="'Select Course'"
            @updateFilter="updateFilter">
            <i className="fas fa-graduation-cap"></i>
        </AppViewSearchSelect>

        <AppViewSearchInput :search="'keyword'" @updateFilter="updateFilter" />

        <div className="asset-amount">{{ filteredImages.length }} images</div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppViewSearchSelect from './AppViewSearchSelect'
import AppViewSearchInput from './AppViewSearchInput'

export default {
    name: 'AppViewSearch',
    components: {
        AppViewSearchSelect,
        AppViewSearchInput
    },
    data() {
        return {
            options: [
                'CAM',
                'UCT',
                'BSM',
                'HIL',
                'INF',
                'SUF',
                'SUP',
                'WLC',
                'HAR'
            ]
        }
    },
    computed: mapGetters([
        'filter',
        'allImages',
        'filteredImages',
        'visibleImages'
    ]),
    methods: {
        ...mapActions(['setFilter', 'setFilteredImages']),
        updateFilter(obj) {
            const filter = this.filter
            filter[obj.search] = obj.value || ''

            const locallyFilteredImages = this.filterImages(
                filter,
                this.allImages
            )
            this.setFilter(filter)
            this.setFilteredImages(locallyFilteredImages)
        },
        filterImages(filterObj, imgsArr) {
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
    }
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
