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
                        :search="'acronym'"
                        :options="universityNames"
                        :placeholder="'Select relevant UP'"
                        @updateFilter="universityNames">
                        <i class="fas fa-university"></i>
                    </AppViewPopupSelect>
                </div>
            </div>
            <div class="popup-controls">
                <div class="btn cancel" @click="closePopup">Cancel</div>
                <div class="btn action" @click="removeUni">
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
            this.setPopup({ isActive: false, type: '' })
        },
        setPopupIsLoading() {
            const popup = this.popup
            popup.isLoading = true
            this.setPopup(popup)
        },
        updateRequestData(dataObj) {
            const acronym = dataObj.value
            this.universities.forEach((uni) => {
                if (uni.acronym === acronym) {
                    this.requestData = uni
                }
            })
        },
        removeUni() {
            this.setPopupIsLoading()
            this.universitiesRequest({
                endpoint: 'deleteUni',
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
