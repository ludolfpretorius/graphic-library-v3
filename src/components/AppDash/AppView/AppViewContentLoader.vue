<template>
    <div id="AppViewContentLoader" :class="{ absolute: absolute }">
        <img
            :src="require('@/assets/imgs/loader.svg')"
            alt="Loader"
            loading="eager" />
    </div>
</template>

<script>
export default {
    name: 'AppViewContentLoader',
    props: {
        absolute: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped lang="scss">
#AppViewContentLoader {
    width: calc(100vw - 260px);
    background: rgba(248, 246, 248, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 260px;
    z-index: 3;
    &.absolute {
        height: 100vh;
        position: absolute;
    }
}
</style>
