<template>
    <div id="AppSidebarMenu">
        <h5 style="margin-top: 0">Sharing</h5>
        <ul>
            <li>
                <a href="#" @click="firePopup('generate-link')">
                    <i class="fas fa-link"></i>
                    Create shareable link
                </a>
            </li>
        </ul>

        <h5>UPs & Courses</h5>
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

        <h5>Session</h5>
        <ul>
            <li>
                <a href="#">
                    <i class="fas fa-power-off"></i>
                    Log out
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'AppSidebarMenu',
    data() {
        return {}
    },
    methods: {
        ...mapActions(['setPopup']),
        firePopup(type) {
            this.setPopup({ isActive: true, type: type })
        }
    }
}
</script>

<style scoped lang="scss">
#AppSidebarMenu {
    padding-top: 30px;
    h5 {
        padding: 0 30px;
        margin: 30px 0 10px 0;
        font-size: 14px;
        font-weight: normal;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.4);
    }
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
        li {
            a {
                padding: 11px 27px;
                color: rgba(255, 255, 255, 0.8);
                font-size: 16px;
                font-weight: 500;
                text-decoration: none;
                display: block;
                i {
                    width: 15px;
                    margin-right: 10px;
                    text-align: center;
                }
                &:hover {
                    padding-left: 24px;
                    background-color: lighten($navy, 3%);
                    color: rgba(255, 255, 255, 1);
                    border-left: 3px solid $green;
                }
            }
        }
    }
}
</style>
