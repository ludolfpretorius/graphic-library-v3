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
                        :search="'vsgOfficial'"
                        :options="['Yes', 'No']"
                        :placeholder="'Is this image(s) in the official VSG?'"
                        @updateFilter="updateVSGOfficial">
                        <i class="fas fa-star"></i>
                    </AppViewPopupSelect>
                </div>
            </div>
            <div class="popup-controls">
                <div class="btn cancel" @click="closePopup">Cancel</div>
                <div class="btn action" @click="callUploadImage">
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
            this.setPopup({ isActive: false, type: '' })
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
        prepDataForUpload() {
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
        callUploadImage() {
            const ready = this.validateData()
            if (!ready) {
                return
            }
            this.setPopupIsLoading()
            this.prepDataForUpload()
            this.imagesRequest({ endpoint: 'uploadImage' }).then(() => {
                this.setPopup({
                    isLoading: false,
                    isActive: false,
                    type: ''
                })
            })
        }
    },
    created() {
        this.imagesRequest({ endpoint: 'fetchTags' })
    }
}
</script>

<style scoped lang="scss"></style>
