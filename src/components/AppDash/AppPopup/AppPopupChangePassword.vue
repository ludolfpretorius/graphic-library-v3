<template>
    <div id="AppPopupChangePassword" class="popup" @click.self="closePopup">
        <div class="popup-content-wrap">
            <AppPopupLoader v-show="popup.isLoading" />
            <div class="popup-header">
                <h2>Change the default password</h2>
                <h4>
                    Select which password to change and complete the password
                    fields
                </h4>
            </div>
            <div class="popup-body">
                <div class="input-group">
                    <AppViewPopupSelect
                        ref="passwordType"
                        :search="'user'"
                        :options="passwordOptions"
                        :placeholder="'Select which password to change'"
                        @updateFilter="updateRequestData">
                        <i class="fas fa-user"></i>
                    </AppViewPopupSelect>
                </div>
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
import AppViewPopupSelect from './AppViewPopupSelect'
import AppViewPopupInput from './AppViewPopupInput'
import AppPopupLoader from './AppPopupLoader'

export default {
    name: 'AppPopupChangePassword',
    components: {
        AppViewPopupSelect,
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
                confirmNewPassword: '',
                user: 0
            },
            passwordOptions: [
                {
                    value: 1,
                    label: 'General user password'
                },
                {
                    value: 2,
                    label: 'Admin user password'
                }
            ]
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
                !data.user ||
                !data.oldPassword.length ||
                !data.newPassword.length ||
                !data.confirmNewPassword.length
            ) {
                alert('Please complete each input before submitting.')
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
                endpoint: 'changePassword',
                data: data
            }).then(() => {
                this.closePopup()
            })
        }
    }
}
</script>

<style scoped lang="scss"></style>
