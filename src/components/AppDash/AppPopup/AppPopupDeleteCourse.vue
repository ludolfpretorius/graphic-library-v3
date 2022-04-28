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
                        ref="uni"
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
                        @updateFilter="updateRequestData">
                        <i class="fas fa-graduation-cap"></i>
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
            this.setPopup({ isActive: false, isLoading: false, type: '' })
        },
        setPopupIsLoading(bool) {
            const popup = this.popup
            popup.isLoading = bool
            this.setPopup(popup)
        },
        updateUni(dataObj) {
            this.clearCourseInput()
            this.updateRequestData(dataObj)
            this.setCourses(dataObj.value || '')
        },
        clearCourseInput() {
            const courseInput = this.$refs.courseInput
            courseInput.$refs.multiselect.clear()
        },
        clearInputValues() {
            Object.keys(this.$refs).forEach((input) => {
                this.$refs[input].$refs.multiselect.clear()
            })
        },
        updateRequestData(dataObj) {
            this.requestData[dataObj.search] = dataObj.value || ''
            if (dataObj.search === 'uni') {
                this.universities.forEach((uni) => {
                    if (
                        this.requestData.uni.length &&
                        uni.acronym === this.requestData.uni
                    ) {
                        this.requestData.id = uni.id
                    }
                })
            }
        },
        validateData() {
            const data = this.requestData
            if (!data.uni.length || !data.course.length) {
                alert(
                    'Please select the relevant UP and course you want to delete before submitting.'
                )
                return false
            }
            return true
        },
        formatData() {
            const component = this
            const data = {
                endpoint: 'deleteCourse',
                data: {
                    id: component.requestData.id,
                    uni: component.requestData.uni,
                    course: component.requestData.course
                }
            }
            return data
        },
        callRequest() {
            const ready = this.validateData()
            if (!ready) {
                return
            }
            const data = this.formatData()
            this.setPopupIsLoading(true)
            this.clearInputValues()
            this.universitiesRequest(data).then(() => {
                this.closePopup()
            })
        }
    }
}
</script>

<style scoped lang="scss"></style>
