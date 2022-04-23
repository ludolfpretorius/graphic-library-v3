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
import AppViewSearchSelect from './AppViewSearchSelect'
import AppViewSearchInput from './AppViewSearchInput'
import uniCourseSelectFunctionality from '@/composables/uniCourseSelectFunctionality'

export default {
    name: 'AppViewSearch',
    components: {
        AppViewSearchSelect,
        AppViewSearchInput
    },
    setup() {
        const {
            courseInput,
            updateUni,
            updateCourse,
            updateKeyword,
            universityNames,
            courses,
            filteredImages
        } = uniCourseSelectFunctionality()

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
        margin: 0;
    }
}
</style>
