<template>
    <div id="GuestLoader">
        <img
            :src="require('@/assets/imgs/loader.svg')"
            alt="Loader"
            loading="eager" />
    </div>
</template>

<script>
export default {
    name: 'GuestLoader',
    props: {
        absolute: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped lang="scss">
#GuestLoader {
    width: 100vw;
    height: 100vh;
    background-color: rgba(248, 246, 248, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 260px;
    z-index: 3;
}
</style>
