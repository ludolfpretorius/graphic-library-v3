<template>
    <div id="AppPopupNewUni" class="popup">
        <div class="popup-content-wrap">
            <div class="popup-header">
                <h2>Add a new university partner</h2>
                <h4>
                    Type the UP name and acronym in the provided input fields
                </h4>
            </div>
            <div class="popup-body">
                <div class="input-group">
                    <AppViewPopupInput
                        :placeholder="'University full name, e.g. Harvard'">
                        <i class="fas fa-university"></i>
                    </AppViewPopupInput>
                </div>
                <div class="input-group">
                    <AppViewPopupInput
                        :placeholder="'University acronym, e.g. HAR'">
                        <i class="fas fa-university"></i>
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
import AppViewPopupInput from './AppViewPopupInput'

export default {
    name: 'AppPopupNewUni',
    components: {
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
