<template>
    <div id="AppPopupNewUni" class="popup">
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
                        :search="'name'"
                        :placeholder="'University full name, e.g. Harvard'"
                        @updateData="updateRequestData">
                        <i class="fas fa-university"></i>
                    </AppViewPopupInput>
                </div>
                <div class="input-group">
                    <AppViewPopupInput
                        :search="'acronym'"
                        :placeholder="'University acronym, e.g. HAR'"
                        @updateData="updateRequestData">
                        <i class="fas fa-university"></i>
                    </AppViewPopupInput>
                </div>
            </div>
            <div class="popup-controls">
                <div class="btn cancel" @click="closePopup">Cancel</div>
                <div class="btn action" @click="addNewUni">
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
        addNewUni() {
            this.setPopupIsLoading()
            this.universitiesRequest({
                endpoint: 'addNew',
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
