<template>
    <div id="AppNotification" :class="{ show: notification.isActive }">
        <div class="notification-close flex-center" @click="closeNotification">
            ×
        </div>
        <div
            :class="{
                'notification-header': true,
                error: notification.status === 'error'
            }">
            {{ capitalizeStatus }}!
        </div>
        <div class="notification-body">{{ notification.message }}</div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'AppNotification',
    data() {
        return {}
    },
    watch: {
        notification() {
            if (this.notification.isActive) {
                setTimeout(() => this.closeNotification(), 4000)
            }
        }
    },
    computed: {
        ...mapGetters(['notification']),
        capitalizeStatus() {
            const str = this.notification.status
            return str.slice(0, 1).toUpperCase() + str.slice(1, str.length)
        }
    },
    methods: {
        ...mapActions(['setNotification']),
        closeNotification() {
            const data = this.notification
            data.isActive = false
            this.setNotification(data)
        }
    }
}
</script>

<style scoped lang="scss">
#AppNotification {
    width: 350px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: $boxShadowBig;
    position: absolute;
    bottom: 40px;
    right: 140px;
    z-index: 1;
    transform: translateY(calc(100% + 40px));
    overflow: hidden;
    transition: $animateSlow;
    .notification-close {
        width: 30px;
        height: 30px;
        padding-bottom: 2px;
        border-radius: 6px;
        color: #fff;
        font-size: 40px;
        position: absolute;
        right: 10px;
        top: 7px;
        cursor: pointer;
        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
    &.show {
        transform: translateY(0);
    }
    .notification-header {
        padding: 10px 20px;
        background-color: darken($green, 5%);
        color: #fff;
        font-weight: bold;
        font-size: 20px;
        &.error {
            background-color: $red;
        }
    }
    .notification-body {
        padding: 20px;
        color: $black;
    }
}
</style>
