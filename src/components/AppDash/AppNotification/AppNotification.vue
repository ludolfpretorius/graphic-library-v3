<template>
    <div id="AppNotification">
        <div class="notification-close flex-center">×</div>
        <div
            :class="{ 'notification-header': true, error: status === 'error' }">
            Success!
        </div>
        <div class="notification-body">Image uploaded</div>
    </div>
</template>

<script>
export default {
    name: 'AppNotification',
    data() {
        return {}
    },
    methods: {}
}
</script>

<style scoped lang="scss">
#AppNotification {
    width: 350px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: $boxShadowBig;
    overflow: hidden;
    position: absolute;
    bottom: 40px;
    right: 140px;
    z-index: 1;
    .notification-close {
        width: 20px;
        height: 20px;
        color: #fff;
        font-size: 40px;
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
    }
    .notification-header {
        padding: 10px 20px;
        background-color: darken($green, 5%);
        color: #fff;
        font-weight: bold;
        font-size: 20px;
    }
    .notification-body {
        padding: 20px;
        color: $black;
    }
}
</style>
