<template>
    <div id="AppPopupUploadImage" class="popup">
        <div class="popup-content-wrap">
            <div class="popup-header">
                <h2>Uploading image</h2>
                <h4>But first, let's add some information about the image</h4>
            </div>
            <div class="popup-body">
                <div class="input-group">
                    <AppViewPopupSelect
                        :options="universities"
                        :placeholder="'Select UP'">
                        <i class="fas fa-university"></i>
                    </AppViewPopupSelect>
                    <AppViewPopupSelect
                        :options="options"
                        :placeholder="'Select Course'">
                        <i class="fas fa-graduation-cap"></i>
                    </AppViewPopupSelect>
                </div>
                <div class="input-group">
                    <AppViewPopupSelect
                        :mode="'tags'"
                        :options="tags"
                        :placeholder="'Add tags'">
                        <i class="fas fa-tags"></i>
                    </AppViewPopupSelect>
                </div>
            </div>
            <div class="popup-controls">
                <div class="btn cancel" @click="closeDropdown">Cancel</div>
                <div class="btn action">{{ actionBtnText }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppViewPopupSelect from './AppViewPopupSelect'

export default {
    name: 'AppPopupUploadImage',
    components: {
        AppViewPopupSelect
    },
    props: {
        actionBtnText: {
            type: String,
            default: 'Btn text (is a prop)'
        }
    },
    computed: mapGetters(['tags', 'universities']),
    data() {
        return {
            options: [1, 2, 3]
        }
    },
    methods: {
        ...mapActions(['setPopup', 'imagesRequest']),
        closeDropdown() {
            this.setPopup({ isActive: false, type: '' })
        }
    },
    created() {
        this.imagesRequest('fetchTags')
    }
}
</script>

<style scoped lang="scss"></style>
