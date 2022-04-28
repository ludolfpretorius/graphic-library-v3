<template>
    <div id="AppPopupDeleteUni" class="popup" @click.self="closePopup">
        <div class="popup-content-wrap">
            <AppPopupLoader v-show="popup.isLoading" />
            <div class="popup-header">
                <h2>Delete a university partner</h2>
                <h4>Select and submit the UP you want to delete</h4>
            </div>
            <div class="popup-body">
                <div class="input-group">
                    <AppViewPopupSelect
                        ref="uniInput"
                        :search="'acronym'"
                        :options="universityNames"
                        :placeholder="'Select relevant UP'"
                        @updateFilter="updateRequestData">
                        <i class="fas fa-university"></i>
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
    name: 'AppPopupDeleteUni',
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
            requestData: {}
        }
    },
    computed: mapGetters(['popup', 'universities', 'universityNames']),
    methods: {
        ...mapActions(['setPopup', 'universitiesRequest']),
        closePopup() {
            this.setPopup({ isActive: false, isLoading: false, type: '' })
        },
        setPopupIsLoading() {
            const popup = this.popup
            popup.isLoading = true
            this.setPopup(popup)
        },
        clearInputValues() {
            Object.keys(this.$refs).forEach((input) => {
                this.$refs[input].$refs.multiselect.clear()
            })
        },
        updateRequestData(dataObj) {
            const acronym = dataObj.value
            this.universities.forEach((uni) => {
                if (uni.acronym === acronym) {
                    this.requestData = uni
                }
            })
        },
        validateData() {
            const data = this.requestData
            if (!Object.keys(data).length) {
                alert(
                    'Please select the UP you want to delete before submitting.'
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
            this.setPopupIsLoading()
            this.clearInputValues()
            this.universitiesRequest({
                endpoint: 'deleteUni',
                data: this.requestData
            }).then(() => {
                this.closePopup()
            })
        }
    }
}
</script>

<style scoped lang="scss"></style>
