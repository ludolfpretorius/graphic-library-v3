<template>
    <div id="AppPopupDeleteCourse" class="popup" @click.self="closePopup">
        <div class="popup-content-wrap">
            <AppPopupLoader v-show="popup.isLoading" />
            <div class="popup-header">
                <h2>Delete a course</h2>
                <h4>
                    Select the relevant UP and then the course you want to
                    delete
                </h4>
            </div>
            <div class="popup-body">
                <div class="input-group">
                    <AppViewPopupSelect
                        :search="'uni'"
                        :options="universityNames"
                        :placeholder="'Select relevant UP'"
                        @updateFilter="updateUni">
                        <i class="fas fa-university"></i>
                    </AppViewPopupSelect>
                    <AppViewPopupSelect
                        ref="courseInput"
                        :search="'course'"
                        :options="courses"
                        :placeholder="'Select course to delete'"
                        @updateFilter="updateCourse">
                        <i class="fas fa-graduation-cap"></i>
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
    name: 'AppPopupDeleteCourse',
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
                id: null,
                uni: '',
                course: ''
            }
        }
    },
    computed: mapGetters([
        'popup',
        'universities',
        'universityNames',
        'courses'
    ]),
    methods: {
        ...mapActions(['setPopup', 'universitiesRequest', 'setCourses']),
        closePopup() {
            this.setPopup({ isActive: false, type: '' })
        },
        setPopupIsLoading() {
            const popup = this.popup
            popup.isLoading = true
            this.setPopup(popup)
        },
        updateUni(dataObj) {
            this.updateRequestData(dataObj)
            this.setCourses(dataObj.value || '')
            this.clearCourseInput()
        },
        updateCourse(dataObj) {
            this.updateRequestData(dataObj)
        },
        clearCourseInput() {
            const courseInput = this.$refs.courseInput
            courseInput.$refs.multiselect.clear()
        },

        updateRequestData(dataObj) {
            this.requestData[dataObj.search] = dataObj.value || ''
            this.universities.forEach((uni) => {
                if (
                    this.requestData.uni.length &&
                    uni.acronym === this.requestData.uni
                ) {
                    this.requestData.id = uni.id
                }
            })
        },
        removeUni() {
            this.setPopupIsLoading()
            this.universitiesRequest({
                endpoint: 'deleteCourse',
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
