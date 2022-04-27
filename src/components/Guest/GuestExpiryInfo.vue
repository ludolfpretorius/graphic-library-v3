<template>
    <div id="GuestExpiryInfo">
        This link expires on&nbsp;<strong>{{ expiryDate }}</strong
        >&nbsp;or&nbsp;
        <div class="small-btn" @click="$emit('expireLink')">Expire now</div>
    </div>
</template>

<script>
export default {
    name: 'GuestExpiryInfo',
    props: {
        guest: {
            type: Object,
            required: true
        }
    },
    computed: {
        expiryDate() {
            return new Date(this.guest.expires * 1000).toDateString()
        }
    },
    methods: {}
}
</script>

<style scoped lang="scss">
#GuestExpiryInfo {
    width: 100%;
    height: 40px;
    background-color: $navy;
    font-size: 14px;
    text-align: center;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1;
    .small-btn {
        padding: 2px 8px;
        background-color: $blue;
        border-radius: 20px;
        font-weight: bold;
        cursor: pointer;
    }
}
</style>
