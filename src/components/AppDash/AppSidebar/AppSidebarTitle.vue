<template>
    <div id="AppSidebarTitle">
        <img src="@/assets/imgs/cslogo-white.svg" alt="CS logo" />
        <h3>Graphic Library</h3>
    </div>
</template>

<script>
export default {
    name: 'AppSidebarTitle',
    data() {
        return {}
    },
    methods: {}
}
</script>

<style scoped lang="scss">
#AppSidebarTitle {
    height: 100px;
    padding: 30px;
    background-color: lighten($navy, 3%);
    img {
        width: 190px;
        display: block;
    }
    h3 {
        margin: 5px 0 0px;
        font-size: 17px;
        color: #fff;
        // text-align: center;
    }
}
</style>
