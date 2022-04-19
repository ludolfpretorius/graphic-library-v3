<template>
    <div id="AppPopupGenerateLink" class="popup">
        <div class="popup-content-wrap">
            <div class="popup-header">
                <h2>Generate a publicly shareable link</h2>
                <h4>
                    Step 1: Select the UP, course and/or keywords
                    <em>before</em> creating the link <br />
                    Step 2: Open this popup and select the link's expiry date
                    below<br />
                    Step 3: Click "Create link" and watch the magic happen
                </h4>
            </div>
            <div class="popup-body">
                <div class="input-group">
                    <AppViewPopupSelect
                        :options="options"
                        :placeholder="'Select expiry date'">
                        <i class="far fa-calendar-check"></i>
                    </AppViewPopupSelect>
                </div>
                <div class="input-group">
                    <AppViewPopupLinkDisplay :placeholder="linkDisplayText" />
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
import AppViewPopupLinkDisplay from './AppViewPopupLinkDisplay'

export default {
    name: 'AppPopupUploadImage',
    components: {
        AppViewPopupSelect,
        AppViewPopupLinkDisplay
    },
    props: {
        actionBtnText: {
            type: String,
            default: 'Btn text (is a prop)'
        }
    },
    data() {
        return {
            options: [
                'Expires in 1 Day',
                'Expires in 1 Week',
                'Expires in 1 Month',
                'Expires in 3 Months'
            ],
            linkDisplayText: 'The created link will be displayed here'
        }
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
