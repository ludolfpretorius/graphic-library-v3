<template>
    <div id="LoginTitle">
        <img src="@/assets/imgs/cslogo.svg" alt="CS logo" />
        <h3>Graphic Library</h3>
    </div>
</template>

<script>
export default {
    name: 'LoginTitle',
    data() {
        return {}
    },
    methods: {}
}
</script>

<style scoped lang="scss">
#LoginTitle {
    img {
        width: 470px;
        margin: 0 0 0 0;
    }
    h3 {
        margin: 15px 0 30px 0;
        color: $black;
        font-size: 25px;
        text-align: center;
        letter-spacing: 2px;
    }
}
</style>
