<template>
    <h5 style="margin-top: 0">UPs & Courses</h5>
    <ul>
        <li>
            <a href="#" @click="firePopup('new-uni')">
                <i class="fas fa-university"></i>
                Add new UP
            </a>
        </li>
        <li>
            <a href="#" @click="firePopup('new-course')">
                <i class="fas fa-graduation-cap"></i>
                Add new course
            </a>
        </li>
    </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'AppSidebarMenuUnies',
    methods: {
        ...mapActions(['setPopup']),
        firePopup(type) {
            this.setPopup({ isActive: true, type: type })
        }
    }
}
</script>

<style scoped lang="scss"></style>
