<template>
    <div id="AppViewContentLoader">
        <img
            :src="require('@/assets/imgs/loader.svg')"
            alt="Loader"
            loading="eager" />
    </div>
</template>

<script>
export default {
    name: 'AppViewContentLoader'
}
</script>

<style scoped lang="scss">
#AppViewContentLoader {
    width: calc(100vw - 260px);
    height: 100vh;
    background: rgba(248, 246, 248, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 260px;
    z-index: 3;
}
</style>
