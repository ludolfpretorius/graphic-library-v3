<template>
    <div id="AppViewContentScrolltop" :class="{ show: show }">
        <i className="fas fa-chevron-up"></i>
    </div>
</template>

<script>
export default {
    name: 'AppViewContentScrolltop',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped lang="scss">
#AppViewContentScrolltop {
    width: 60px;
    height: 60px;
    background-color: $blue;
    border-radius: 100%;
    box-shadow: $boxShadowMid;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 40px;
    bottom: 40px;
    z-index: 1;
    transform: translateY(calc(100% + 40px));
    transition: all 0.4s ease;
    cursor: pointer;
    i {
        padding-bottom: 2px;
        font-size: 22px;
        color: #fff;
    }
    &.show {
        transform: translateY(0);
    }
}
</style>
