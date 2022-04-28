<template>
    <div id="AppPopupUploadImage" class="popup">
        <div class="popup-content-wrap">
            <AppPopupLoader v-show="popup.isLoading" />
            <div class="popup-header">
                <h2>Uploading image</h2>
                <h4>But first, let's add some information about the image</h4>
            </div>
            <div class="popup-body">
                <div class="input-group">
                    <AppViewPopupSelect
                        ref="uniInput"
                        :search="'uni'"
                        :options="universityNames"
                        :placeholder="'Select UP'"
                        @updateFilter="updateUni">
                        <i class="fas fa-university"></i>
                    </AppViewPopupSelect>
                    <AppViewPopupSelect
                        ref="courseInput"
                        :search="'course'"
                        :options="courses"
                        :placeholder="'Select Course'"
                        @updateFilter="updateCourse">
                        <i class="fas fa-graduation-cap"></i>
                    </AppViewPopupSelect>
                </div>
                <div class="input-group">
                    <AppViewPopupSelect
                        ref="tagsInput"
                        :mode="'tags'"
                        :search="'tags'"
                        :options="tags"
                        :placeholder="'Add tags'"
                        @updateFilter="updateTags">
                        <i class="fas fa-tags"></i>
                    </AppViewPopupSelect>
                </div>
                <div class="input-group">
                    <AppViewPopupSelect
                        ref="vsgInput"
                        :search="'vsgOfficial'"
                        :options="vsgOptions"
                        :placeholder="'Is this image(s) in the official VSG?'"
                        @updateFilter="updateVSGOfficial">
                        <i class="fas fa-star"></i>
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
    name: 'AppPopupUploadImage',
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
    computed: mapGetters([
        'tags',
        'universities',
        'universityNames',
        'courses',
        'popup',
        'filesToUpload'
    ]),
    data() {
        return {
            vsgOptions: [
                {
                    value: 'Yes',
                    label: 'Yes'
                },
                {
                    value: 'No',
                    label: 'No'
                }
            ],
            imageData: {
                uni: '',
                course: '',
                tags: [],
                vsgOfficial: ''
            }
        }
    },
    methods: {
        ...mapActions([
            'imagesRequest',
            'setPopup',
            'setCourses',
            'setUploadImgData'
        ]),
        closePopup() {
            this.setPopup({ isActive: false, isLoading: false, type: '' })
            this.clearInputValues()
        },
        updateUni(dataObj) {
            this.updateImageData(dataObj)
            this.setCourses(dataObj.value || '')
            this.clearCourseInput()
        },
        updateCourse(dataObj) {
            this.updateImageData(dataObj)
        },
        updateTags(dataObj) {
            this.updateImageData(dataObj)
        },
        updateVSGOfficial(dataObj) {
            this.updateImageData(dataObj)
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
        updateImageData(dataObj) {
            this.imageData[dataObj.search] = dataObj.value || ''
        },
        setPopupIsLoading() {
            const popup = this.popup
            popup.isLoading = true
            this.setPopup(popup)
        },
        validateData() {
            const data = this.imageData
            if (!data.uni.length || !data.tags.length) {
                alert(
                    "Please add a UP (use MISC if there're none applicable) and some tags before uploading the image."
                )
                return false
            }
            return true
        },
        formatData() {
            const formData = new FormData()
            const filesArray = this.filesToUpload
            const data = {
                up: this.imageData.uni,
                course: this.imageData.course,
                tags: this.imageData.tags,
                vsgOfficial: this.imageData.vsgOfficial === 'Yes' ? true : false
            }
            formData.append('path', 'images/uploadImage')
            formData.append('data', JSON.stringify(data))
            filesArray.forEach((file, i) => {
                formData.append('file' + (i + 1), file)
            })
            this.setUploadImgData(formData)
        },
        callRequest() {
            const ready = this.validateData()
            if (!ready) {
                return
            }
            this.setPopupIsLoading()
            this.formatData()
            this.imagesRequest({ endpoint: 'uploadImage' }).then(() => {
                this.closePopup()
            })
        }
    }
}
</script>

<style scoped lang="scss"></style>
