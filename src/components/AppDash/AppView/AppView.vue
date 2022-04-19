<template>
    <div id="AppView">
        <AppViewSearch />
        <AppViewContent />
    </div>
</template>

<script>
import AppViewSearch from './AppViewSearch'
import AppViewContent from './AppViewContent'

export default {
    name: '',
    components: {
        AppViewSearch,
        AppViewContent
    },
    data() {
        return {}
    },
    methods: {}
}
</script>

<style scoped lang="scss">
#AppView {
    flex-grow: 1;
    height: 100vh;
    overflow: hidden;
    // width: 100%;
}
</style>
