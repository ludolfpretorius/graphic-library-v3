<template>
    <h5>Session</h5>
    <ul>
        <li>
            <a href="#" @click="callRequest">
                <i class="fas fa-power-off"></i>
                Log out
            </a>
        </li>
    </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'AppSidebarMenuSession',
    methods: {
        ...mapActions(['setPopup', 'authRequest']),
        callRequest() {
            this.authRequest({
                endpoint: 'logout'
            }).then((success) => {
                if (success) {
                    this.$router.push('/login')
                }
            })
        }
    }
}
</script>

<style scoped lang="scss"></style>
