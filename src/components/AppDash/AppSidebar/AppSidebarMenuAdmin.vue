<template>
    <h5>Admin</h5>
    <ul>
        <li>
            <a href="#" @click="firePopup('delete-uni')">
                <i class="fas fa-trash-alt"></i>
                Delete UP
            </a>
        </li>
        <li>
            <a href="#" @click="firePopup('delete-course')">
                <i class="fas fa-trash-alt"></i>
                Delete course
            </a>
        </li>
        <li>
            <a href="#" @click="firePopup('add-tags')">
                <i class="fas fa-tags"></i>
                Add new tags
            </a>
        </li>
        <li>
            <a href="#" @click="firePopup('delete-tags')">
                <i class="fas fa-tags"></i>
                Delete tags
            </a>
        </li>
    </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'AppSidebarMenuAdmin',
    methods: {
        ...mapActions(['setPopup']),
        firePopup(type) {
            this.setPopup({ isActive: true, type: type })
        }
    }
}
</script>

<style scoped lang="scss"></style>
