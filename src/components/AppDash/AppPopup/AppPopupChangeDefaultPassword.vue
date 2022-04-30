<template>
    <div
        id="AppPopupChangeDefaultPassword"
        class="popup"
        @click.self="closePopup">
        <div class="popup-content-wrap">
            <AppPopupLoader v-show="popup.isLoading" />
            <div class="popup-header">
                <h2>Change the default password</h2>
                <h4>
                    Type the old password and new password and then confirm the
                    new password
                </h4>
            </div>
            <div class="popup-body">
                <div class="input-group">
                    <AppViewPopupInput
                        ref="oldPassword"
                        :search="'oldPassword'"
                        :type="'password'"
                        :placeholder="'Old password'"
                        @updateData="updateRequestData">
                        <i class="fas fa-lock"></i>
                    </AppViewPopupInput>
                </div>
                <div class="input-group">
                    <AppViewPopupInput
                        ref="newPassword"
                        :search="'newPassword'"
                        :type="'password'"
                        :placeholder="'New password'"
                        @updateData="updateRequestData">
                        <i class="fas fa-lock"></i>
                    </AppViewPopupInput>
                    <AppViewPopupInput
                        ref="confirmNewPassword"
                        :search="'confirmNewPassword'"
                        :type="'password'"
                        :placeholder="'Confirm new password'"
                        @updateData="updateRequestData">
                        <i class="fas fa-lock"></i>
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
    name: 'AppPopupChangeDefaultPassword',
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
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            }
        }
    },
    computed: mapGetters(['popup']),
    methods: {
        ...mapActions(['setPopup', 'authRequest']),
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
            if (
                !data.oldPassword.length ||
                !data.newPassword.length ||
                !data.confirmNewPassword.length
            ) {
                alert(
                    'Please type the old password and new password and then confirm the new password before submitting.'
                )
                return false
            }
            if (data.newPassword !== data.confirmNewPassword) {
                alert(
                    'The new password differs from the one in the confirm field.'
                )
                return false
            }
            delete data.confirmNewPassword
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
            this.authRequest({
                endpoint: 'changeDefaultPassword',
                data: data
            }).then(() => {
                this.closePopup()
            })
        }
    }
}
</script>

<style scoped lang="scss"></style>
