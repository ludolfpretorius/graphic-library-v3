<template>
    <div id="Guest">
        <GuestLoader v-if="isLoading" />
        <GuestExpired v-if="!tokenIsValid" />
        <div v-else>
            <GuestExpiryInfo :guest="guest" @expire-link="expireLink" />
            <GuestNav />
            <GuestContent />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import GuestLoader from '@/components/Guest/GuestLoader'
import GuestExpired from '@/components/Guest/GuestExpired'
import GuestExpiryInfo from '@/components/Guest/GuestExpiryInfo'
import GuestNav from '@/components/Guest/GuestNav'
import GuestContent from '@/components/Guest/GuestContent'

export default {
    name: 'AppDash',
    components: {
        GuestLoader,
        GuestExpired,
        GuestExpiryInfo,
        GuestNav,
        GuestContent
    },
    data() {
        return {
            isLoading: true
        }
    },
    computed: mapGetters(['tokenIsValid', 'guest']),
    methods: {
        ...mapActions(['guestRequest']),
        getUrlToken() {
            if (!this.$route.query.t) {
                return false
            }
            return this.$route.query.t
        },
        expireLink() {
            if (confirm('Are you sure you want to expire this link?')) {
                this.guestRequest({
                    endpoint: 'expireLink',
                    data: {
                        token: this.guest.token
                    }
                })
            }
        }
    },
    created() {
        const token = this.getUrlToken()
        if (!token || token.length !== 24) {
            this.isLoading = false
            return
        }
        this.guestRequest({
            endpoint: 'fetchData',
            data: {
                token: token
            }
        }).then(() => {
            if (this.tokenIsValid) {
                this.guestRequest({
                    endpoint: 'fetchImages',
                    data: {
                        uni: this.guest.filter.uni,
                        course: this.guest.filter.course,
                        keyword: this.guest.filter.keyword
                    }
                }).then(() => {
                    this.isLoading = false
                })
            } else {
                this.isLoading = false
            }
        })
    }
}
</script>

<style scoped lang="scss">
#AppDash {
    height: 100vh;
    position: relative;
    overflow: hidden;
}
</style>
