<template>
    <div id="AppSidebar">
        <AppSidebarTitle />
        <AppSidebarMenu />
    </div>
</template>

<script>
import AppSidebarTitle from './AppSidebarTitle'
import AppSidebarMenu from './AppSidebarMenu'

export default {
    name: 'AppSidebar',
    components: {
        AppSidebarTitle,
        AppSidebarMenu
    },
    data() {
        return {}
    },
    methods: {}
}
</script>

<style scoped lang="scss">
#AppSidebar {
    flex-shrink: 0;
    width: 260px;
    height: 100vh;
    background-color: $navy;
    border-radius: 0 0 0 0;
    position: sticky;
    left: 0;
    top: 0;
    transition: $animateFast;
    // overflow-y: scroll;
    hr {
        margin: 0 0 25px;
        border-top: none;
        border-right: none;
        border-left: none;
        opacity: 0.1;
    }
}
</style>
