<template>
    <div id="AppPopupLoader">
        <img
            :src="require('@/assets/imgs/loader.svg')"
            alt="Loader"
            loading="eager" />
    </div>
</template>

<script>
export default {
    name: 'AppPopupLoader'
}
</script>

<style scoped lang="scss">
#AppPopupLoader {
    width: 100%;
    height: 100%;
    background: rgba(248, 246, 248, 0.8);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 11;
}
</style>
