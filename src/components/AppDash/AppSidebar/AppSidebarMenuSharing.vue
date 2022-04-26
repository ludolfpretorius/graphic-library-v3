<template>
    <h5>Sharing</h5>
    <ul>
        <li>
            <a href="#" @click="firePopup('generate-link')">
                <i class="fas fa-link"></i>
                Create shareable link
            </a>
        </li>
    </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'AppSidebarMenuSharing',
    methods: {
        ...mapActions(['setPopup']),
        firePopup(type) {
            this.setPopup({ isActive: true, type: type })
        }
    }
}
</script>

<style scoped lang="scss"></style>
