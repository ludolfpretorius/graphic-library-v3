<template>
    <div id="LoginAlert" :class="{ show: show }">
        <span>Oops! The password you entered is incorrect.</span>
    </div>
</template>

<script>
export default {
    name: 'LoginAlert',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped lang="scss">
#LoginAlert {
    width: 400px;
    padding: 10px 10px;
    background-color: $red;
    border-radius: 10px;
    color: #fff;
    font-weight: 600;
    text-align: center;
    display: block;
    opacity: 0;
    transition: $animateBack;
    transform: translateY(20px);
    &.show {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
