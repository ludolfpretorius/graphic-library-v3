<template>
    <div id="AppViewSearch">
        <AppViewSearchSelect
            :type="'uni'"
            :options="options"
            :placeholder="'Select UP'"
            @updateFilter="updateFilter">
            <i className="fas fa-university"></i>
        </AppViewSearchSelect>

        <AppViewSearchSelect
            :type="'course'"
            :options="options"
            :placeholder="'Select Course'"
            @updateFilter="updateFilter">
            <i className="fas fa-graduation-cap"></i>
        </AppViewSearchSelect>

        <AppViewSearchInput :type="'keyword'" @updateFilter="updateFilter" />

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
            options: ['BSM', 'HIL', 'INF', 'SUF', 'SUP', 'WLC', 'HAR'],
            tempFilter: {
                uni: '',
                course: '',
                keyword: ''
            }
        }
    },
    computed: mapGetters(['filter', 'filteredImages']),
    methods: {
        ...mapActions(['setFilter']),
        updateFilter() {
            const type = event.currentTarget
            // const filter = this.filter
            // filter[type] = value || ''
            // this.setFilter(filter)
            console.log(type)
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
