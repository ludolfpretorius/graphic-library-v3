<template>
    <div id="AppPopupEditTags" class="popup" @click.self="closePopup">
        <div class="popup-content-wrap">
            <div class="popup-header">
                <h2>Edit image tags/keywords</h2>
                <h4>Change any information and click "Update image"</h4>
            </div>
            <div class="popup-body">
                <div class="input-group">
                    <AppViewPopupSelect
                        :options="options"
                        :value="uniValue"
                        :placeholder="'Select UP'">
                        <i class="fas fa-university"></i>
                    </AppViewPopupSelect>
                    <AppViewPopupSelect
                        :options="options"
                        :value="courseValue"
                        :placeholder="'Select Course'">
                        <i class="fas fa-graduation-cap"></i>
                    </AppViewPopupSelect>
                </div>
                <div class="input-group">
                    <AppViewPopupSelect
                        :options="options"
                        :value="tags"
                        :placeholder="'Add tags'">
                        <i class="fas fa-tags"></i>
                    </AppViewPopupSelect>
                </div>
            </div>
            <div class="popup-controls">
                <div class="btn cancel" @click="closePopup">Cancel</div>
                <div class="btn action">{{ actionBtnText }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppViewPopupSelect from './AppViewPopupSelect'

export default {
    name: 'AppPopupEditTags',
    components: {
        AppViewPopupSelect
    },
    props: {
        actionBtnText: {
            type: String,
            default: 'Btn text (is a prop)'
        }
    },
    data() {
        return {
            options: [1, 2, 3],
            upValue: 'HAR',
            courseValue: 'FIH',
            tags: ['hos', 'awe']
        }
    },
    methods: {
        ...mapActions(['setPopup']),
        closePopup() {
            this.setPopup({ isActive: false, type: '' })
        }
    }
}
</script>

<style scoped lang="scss"></style>
