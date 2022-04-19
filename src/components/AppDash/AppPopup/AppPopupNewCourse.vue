<template>
    <div id="AppPopupNewCourse" class="popup">
        <div class="popup-content-wrap">
            <div class="popup-header">
                <h2>Add a new course</h2>
                <h4>
                    Select the relevant UP and add the course acronym in the
                    provided input field
                </h4>
            </div>
            <div class="popup-body">
                <div class="input-group">
                    <AppViewPopupSelect :placeholder="'Select relevant UP'">
                        <i class="fas fa-university"></i>
                    </AppViewPopupSelect>
                    <AppViewPopupInput
                        :placeholder="'Type course acronym, e.g. FIH'">
                        <i class="fas fa-graduation-cap"></i>
                    </AppViewPopupInput>
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
import { mapActions } from 'vuex'
import AppViewPopupSelect from './AppViewPopupSelect'
import AppViewPopupInput from './AppViewPopupInput'

export default {
    name: 'AppPopupNewCourse',
    components: {
        AppViewPopupSelect,
        AppViewPopupInput
    },
    props: {
        actionBtnText: {
            type: String,
            default: 'Btn text (is a prop)'
        }
    },
    data() {
        return {}
    },
    methods: {
        ...mapActions(['setPopup']),
        closeDropdown() {
            this.setPopup({ isActive: false, type: '' })
        }
    }
}
</script>

<style scoped lang="scss"></style>
