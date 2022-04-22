<template>
    <div id="AppPopupNewCourse" class="popup">
        <div class="popup-content-wrap">
            <AppPopupLoader v-show="popup.isLoading" />
            <div class="popup-header">
                <h2>Add a new course</h2>
                <h4>
                    Select the relevant UP and add the course acronym in the
                    provided input field
                </h4>
            </div>
            <div class="popup-body">
                <div class="input-group">
                    <AppViewPopupSelect
                        :search="'uni'"
                        :options="universityNames"
                        :placeholder="'Select relevant UP'"
                        @updateFilter="updateRequestData">
                        <i class="fas fa-university"></i>
                    </AppViewPopupSelect>
                    <AppViewPopupInput
                        :search="'course'"
                        :placeholder="'Type course acronym, e.g. FIH'"
                        @updateData="updateRequestData">
                        <i class="fas fa-graduation-cap"></i>
                    </AppViewPopupInput>
                </div>
            </div>
            <div class="popup-controls">
                <div class="btn cancel" @click="closePopup">Cancel</div>
                <div class="btn action" @click="addNewCourse">
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
    name: 'AppPopupNewCourse',
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
                uni: '',
                course: ''
            }
        }
    },
    computed: mapGetters(['popup', 'universityNames']),
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
        addNewCourse() {
            this.setPopupIsLoading()
            this.universitiesRequest({
                endpoint: 'addNewCourse',
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
