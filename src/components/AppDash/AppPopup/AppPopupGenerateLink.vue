<template>
    <div id="AppPopupGenerateLink" class="popup">
        <div class="popup-content-wrap">
            <AppPopupLoader v-show="popup.isLoading" />
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
                    <AppPopupGenerateLinkFilterDisplay :filter="filter" />
                </div>
                <div class="input-group">
                    <AppViewPopupSelect
                        :search="'expire'"
                        :options="expiryOptions"
                        :placeholder="'Select expiry date'"
                        @updateFilter="updateRequestData">
                        <i class="far fa-calendar-check"></i>
                    </AppViewPopupSelect>
                </div>
                <div class="input-group">
                    <AppViewPopupLinkDisplay
                        :placeholder="linkDisplayText"
                        :btn-disabled="!copyBtnIsActive"
                        @copied="setCopied" />
                </div>
            </div>
            <div class="popup-controls">
                <div class="btn cancel" @click="closePopup">
                    {{ copyBtnIsActive ? 'Close' : 'Cancel' }}
                </div>
                <div
                    :class="{
                        btn: true,
                        action: true,
                        disable: copyBtnIsActive
                    }"
                    @click="generateLink">
                    {{ actionBtnText }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppPopupGenerateLinkFilterDisplay from './AppPopupGenerateLinkFilterDisplay'
import AppViewPopupSelect from './AppViewPopupSelect'
import AppViewPopupLinkDisplay from './AppViewPopupLinkDisplay'
import AppPopupLoader from './AppPopupLoader'

export default {
    name: 'AppPopupGenerateLink',
    components: {
        AppPopupGenerateLinkFilterDisplay,
        AppViewPopupSelect,
        AppViewPopupLinkDisplay,
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
            expiryOptions: [
                {
                    value: 'Expires in 1 Day',
                    label: 'Expires in 1 Day'
                },
                {
                    value: 'Expires in 1 Week',
                    label: 'Expires in 1 Week'
                },
                {
                    value: 'Expires in 1 Month',
                    label: 'Expires in 1 Month'
                },
                {
                    value: 'Expires in 3 Months',
                    label: 'Expires in 3 Months'
                }
            ],
            requestData: {
                uni: '',
                course: '',
                keyword: ''
            },
            linkDisplayText: 'The created link will be displayed here',
            copyBtnIsActive: false,
            linkHasBeenCopied: false
        }
    },
    computed: mapGetters(['filter', 'popup']),
    methods: {
        ...mapActions(['setPopup', 'imagesRequest']),
        closePopup() {
            if (this.copyBtnIsActive && !this.linkHasBeenCopied) {
                alert(
                    "Make sure you copy the link by clicking the 'Copy link' button before closing this popup."
                )
                return
            }
            this.setPopup({ isActive: false, type: '' })
            this.copyBtnIsActive = false
            this.linkHasBeenCopied = false
            this.linkDisplayText = 'The created link will be displayed here'
        },
        setCopied() {
            this.linkHasBeenCopied = true
        },
        setPopupIsLoading() {
            const popup = this.popup
            popup.isLoading = true
            this.setPopup(popup)
        },
        updateRequestData(dataObj) {
            this.requestData = this.filter
            let expire
            switch (dataObj.value) {
                case this.options[0]:
                    expire = 1
                    break
                case this.options[1]:
                    expire = 2
                    break
                case this.options[2]:
                    expire = 3
                    break
                case this.options[3]:
                    expire = 3
                    break
            }
            this.requestData.expire = expire
            this.requestData.url = window.location.origin + '/guest'
        },
        validateRequest() {
            if (!this.requestData.expire) {
                return false
            }
            return true
        },
        generateLink() {
            if (!this.validateRequest()) {
                alert(
                    'Please select an expiry date from the provided options before creating the link.'
                )
                return
            }
            this.setPopupIsLoading()
            this.imagesRequest({
                endpoint: 'generateShareableLink',
                data: this.requestData
            }).then((resp) => {
                this.linkDisplayText = resp
                this.copyBtnIsActive = true
                this.setPopup({
                    isLoading: false,
                    isActive: true,
                    type: 'generate-link'
                })
            })
        }
    }
}
</script>

<style scoped lang="scss"></style>
