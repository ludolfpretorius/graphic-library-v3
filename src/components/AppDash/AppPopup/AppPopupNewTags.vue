<template>
    <div id="AppPopupNewTags" class="popup" @click.self="closePopup">
        <div class="popup-content-wrap">
            <AppPopupLoader v-show="popup.isLoading" />
            <div class="popup-header">
                <h2>Add new tags to the tag list</h2>
                <h4>Type tags out and separate them with a comma</h4>
            </div>
            <div class="popup-body">
                <div class="input-group">
                    <AppViewPopupInput
                        :search="'tags'"
                        :placeholder="'Tags separated with a comma, e.g. rocket, launcher, explodes'"
                        @updateData="updateRequestData">
                        <i class="fas fa-university"></i>
                    </AppViewPopupInput>
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
import AppViewPopupInput from './AppViewPopupInput'
import AppPopupLoader from './AppPopupLoader'

export default {
    name: 'AppPopupNewTags',
    components: {
        AppViewPopupInput,
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
    computed: mapGetters(['popup']),
    methods: {
        ...mapActions(['setPopup', 'imagesRequest']),
        closePopup() {
            this.setPopup({ isActive: false, type: '' })
        },
        setPopupIsLoading() {
            const popup = this.popup
            popup.isLoading = true
            this.setPopup(popup)
        },
        updateRequestData(dataObj) {
            this.requestData[dataObj.search] = dataObj.value
        },
        formatData() {
            const data = this.requestData.tags.split(',')
            const tags = data.map((tag) => tag.trim().toLowerCase())
            this.requestData.tags = tags.sort()
        },
        validateData() {
            const data = this.requestData
            if (!data.tags.length) {
                alert(
                    'Please enter the tags you want to add before submitting.'
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
            this.formatData()
            this.setPopupIsLoading()
            this.imagesRequest({
                endpoint: 'addNewTags',
                data: this.requestData
            }).then(() => {
                this.setPopup({
                    isLoading: false,
                    isActive: false,
                    type: ''
                })
            })
        }
    }
}
</script>

<style scoped lang="scss"></style>
