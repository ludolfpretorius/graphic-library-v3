<template>
    <h5>Session</h5>
    <ul>
        <li>
            <a href="#">
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
        ...mapActions(['setPopup']),
        firePopup(type) {
            this.setPopup({ isActive: true, type: type })
        }
    }
}
</script>

<style scoped lang="scss"></style>
