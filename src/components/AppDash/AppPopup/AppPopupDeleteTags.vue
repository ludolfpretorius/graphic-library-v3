<template>
    <div id="AppPopupDeleteTags" class="popup" @click.self="closePopup">
        <div class="popup-content-wrap">
            <AppPopupLoader v-show="popup.isLoading" />
            <div class="popup-header">
                <h2>Delete tags from the tags list</h2>
                <h4>
                    Select the tags you want to delete and click "Delete tags"
                </h4>
            </div>
            <div class="popup-body">
                <div class="input-group">
                    <AppViewPopupSelect
                        ref="tagsInput"
                        :search="'tags'"
                        :mode="'tags'"
                        :options="tags"
                        :placeholder="'Select tags to delete'"
                        @updateFilter="updateRequestData">
                        <i class="fas fa-tags"></i>
                    </AppViewPopupSelect>
                </div>
            </div>
            <div class="popup-controls">
                <div class="btn cancel" @click="closePopup">Cancel</div>
                <div class="btn action" @click="callRequest">
                    {{ actionBtnText }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppViewPopupSelect from './AppViewPopupSelect'
import AppPopupLoader from './AppPopupLoader'

export default {
    name: 'AppPopupDeleteTags',
    components: {
        AppViewPopupSelect,
        AppPopupLoader
    },
    props: {
        actionBtnText: {
            type: String,
            default: 'Btn text (is a prop)'
        }
    },
    data() {
        return {
            requestData: {
                tags: []
            }
        }
    },
    computed: mapGetters(['popup', 'tags']),
    methods: {
        ...mapActions(['setPopup', 'imagesRequest']),
        closePopup() {
            this.setPopup({ isActive: false, type: '', isLoading: false })
            this.clearInputValues()
        },
        clearInputValues() {
            Object.keys(this.$refs).forEach((input) => {
                this.$refs[input].$refs.multiselect.clear()
            })
        },
        setPopupIsLoading(bool) {
            const popup = this.popup
            popup.isLoading = bool
            this.setPopup(popup)
        },
        updateRequestData(dataObj) {
            this.requestData[dataObj.search] = dataObj.value || ''
        },
        validateData() {
            const data = this.requestData
            if (!data.tags.length) {
                alert(
                    'Please select the tags you want to remove before submitting.'
                )
                return false
            }
            return true
        },
        callRequest() {
            const ready = this.validateData()
            if (!ready) {
                return
            }
            this.setPopupIsLoading(true)
            this.imagesRequest({
                endpoint: 'deleteTags',
                data: this.requestData
            }).then(() => {
                this.closePopup()
            })
        }
    }
}
</script>

<style scoped lang="scss"></style>
