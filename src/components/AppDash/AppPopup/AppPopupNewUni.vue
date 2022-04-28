<template>
    <div id="AppPopupNewUni" class="popup" @click.self="closePopup">
        <div class="popup-content-wrap">
            <AppPopupLoader v-show="popup.isLoading" />
            <div class="popup-header">
                <h2>Add a new university partner</h2>
                <h4>
                    Type the UP name and acronym in the provided input fields
                </h4>
            </div>
            <div class="popup-body">
                <div class="input-group">
                    <AppViewPopupInput
                        ref="uniNameInput"
                        :search="'name'"
                        :placeholder="'University full name, e.g. Harvard'"
                        @updateData="updateRequestData">
                        <i class="fas fa-university"></i>
                    </AppViewPopupInput>
                </div>
                <div class="input-group">
                    <AppViewPopupInput
                        ref="uniAcronymInput"
                        :search="'acronym'"
                        :placeholder="'University acronym, e.g. HAR'"
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
    name: 'AppPopupNewUni',
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
                name: '',
                acronym: ''
            }
        }
    },
    computed: mapGetters(['popup']),
    methods: {
        ...mapActions(['setPopup', 'universitiesRequest']),
        closePopup() {
            this.setPopup({ isActive: false, isLoading: false, type: '' })
            this.clearInputValues()
        },
        setPopupIsLoading() {
            const popup = this.popup
            popup.isLoading = true
            this.setPopup(popup)
        },
        clearInputValues() {
            Object.keys(this.$refs).forEach((input) => {
                if (this.$refs[input].$refs.multiselect) {
                    this.$refs[input].$refs.multiselect.clear()
                } else {
                    this.$refs[input].value = ''
                }
            })
        },
        updateRequestData(dataObj) {
            this.requestData[dataObj.search] = dataObj.value
        },
        validateData() {
            const data = this.requestData
            if (!data.name.length || !data.acronym.length) {
                alert('Please add a UP name and acronym before submitting.')
                return false
            }
            return true
        },
        formatData() {
            const data = this.requestData
            return data
        },
        callRequest() {
            const ready = this.validateData()
            if (!ready) {
                return
            }
            this.setPopupIsLoading()
            const data = this.formatData()
            this.universitiesRequest({
                endpoint: 'addNew',
                data: data
            }).then(() => {
                this.closePopup()
            })
        }
    }
}
</script>

<style scoped lang="scss"></style>
