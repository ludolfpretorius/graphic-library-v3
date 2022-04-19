<template>
    <div id="LoginAlert">
        <span>Oops! The password you entered is incorrect.</span>
    </div>
</template>

<script>
export default {
    name: 'LoginAlert',
    data() {
        return {}
    },
    methods: {}
}
</script>

<style scoped lang="scss">
#LoginAlert {
    width: 380px;
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
