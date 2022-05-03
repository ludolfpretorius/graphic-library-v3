<template>
    <!-- <div v-show="popup.isActive"> -->
    <AppPopupUploadImage
        :class="{ show: popup.isActive && popup.type === 'upload-image' }"
        :action-btn-text="'Upload image'" />
    <AppPopupGenerateLink
        :class="{ show: popup.isActive && popup.type === 'generate-link' }"
        :action-btn-text="'Create link'" />
    <AppPopupNewUni
        :class="{ show: popup.isActive && popup.type === 'new-uni' }"
        :action-btn-text="'Add UP'" />
    <AppPopupNewCourse
        :class="{ show: popup.isActive && popup.type === 'new-course' }"
        :action-btn-text="'Add course'" />
    <AppPopupEditImageTags
        :class="{ show: popup.isActive && popup.type === 'edit-img-tags' }"
        :action-btn-text="'Update image'" />
    <AppPopupDeleteUni
        :class="{ show: popup.isActive && popup.type === 'delete-uni' }"
        :action-btn-text="'Delete UP'" />
    <AppPopupDeleteCourse
        :class="{ show: popup.isActive && popup.type === 'delete-course' }"
        :action-btn-text="'Delete course'" />
    <AppPopupNewTags
        :class="{ show: popup.isActive && popup.type === 'new-tags' }"
        :action-btn-text="'Add new tags'" />
    <AppPopupDeleteTags
        :class="{ show: popup.isActive && popup.type === 'delete-tags' }"
        :action-btn-text="'Delete tags'" />
    <AppPopupChangePassword
        :class="{
            show: popup.isActive && popup.type === 'change-password'
        }"
        :action-btn-text="'Change password'" />
    <!-- </div> -->
</template>

<script>
import { mapGetters } from 'vuex'
import AppPopupUploadImage from '@/components/AppDash/AppPopup/AppPopupUploadImage'
import AppPopupGenerateLink from '@/components/AppDash/AppPopup/AppPopupGenerateLink'
import AppPopupNewUni from '@/components/AppDash/AppPopup/AppPopupNewUni'
import AppPopupNewCourse from '@/components/AppDash/AppPopup/AppPopupNewCourse'
import AppPopupEditImageTags from '@/components/AppDash/AppPopup/AppPopupEditImageTags'
import AppPopupDeleteUni from '@/components/AppDash/AppPopup/AppPopupDeleteUni'
import AppPopupDeleteCourse from '@/components/AppDash/AppPopup/AppPopupDeleteCourse'
import AppPopupNewTags from '@/components/AppDash/AppPopup/AppPopupNewTags'
import AppPopupDeleteTags from '@/components/AppDash/AppPopup/AppPopupDeleteTags'
import AppPopupChangePassword from '@/components/AppDash/AppPopup/AppPopupChangePassword'

export default {
    name: 'AppPopup',
    components: {
        AppPopupUploadImage,
        AppPopupGenerateLink,
        AppPopupNewUni,
        AppPopupNewCourse,
        AppPopupEditImageTags,
        AppPopupDeleteUni,
        AppPopupDeleteCourse,
        AppPopupNewTags,
        AppPopupDeleteTags,
        AppPopupChangePassword
    },
    data() {
        return {}
    },
    computed: mapGetters(['popup']),
    methods: {}
}
</script>

<style lang="scss">
.popup {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    visibility: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
    pointer-events: none;
    transition: $animateSlow;
    overflow: auto;
    overflow-x: hidden;
    &.show {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
    }
}

.popup-content-wrap {
    width: 100%;
    max-width: 800px;
    min-height: 365px;
    padding: 60px 80px 65px;
    margin: auto;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    opacity: 0;
    transition: $animateSlow;
    .popup-header {
        margin-bottom: 40px;
        h2 {
            margin: 0;
            text-align: center;
        }
        h4 {
            margin: 10px 0 0;
            text-align: center;
            color: #aaa;
        }
    }
    .popup-body {
        width: 100%;
        .input-group {
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
            &:last-child {
                margin-bottom: 40px;
            }
        }
    }
    .popup-controls {
        display: flex;
        justify-content: center;
        .btn {
            margin: 0 10px;
            transition: $animateFast;
        }
        .btn.cancel {
            background-color: $btnGrey;
            color: $black;
            &:hover {
                background-color: darken($btnGrey, 10%);
            }
        }
        .btn.action {
            background-color: $blue;
            color: #fff;
            &:hover {
                background-color: darken($blue, 10%);
            }
        }
    }
}

.popup.show .popup-content-wrap {
    top: 60px;
    opacity: 1;
}
</style>
