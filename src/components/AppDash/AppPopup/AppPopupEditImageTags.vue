<template>
    <div id="AppPopupEditImageTags" class="popup" @click.self="closePopup">
        <div class="popup-content-wrap">
            <AppPopupLoader v-show="popup.isLoading" />
            <div class="popup-header">
                <h2>Edit image tags/keywords</h2>
                <h4>Change any information and click "Update image"</h4>
            </div>
            <div class="popup-body">
                <div class="input-group">
                    <AppViewPopupSelect
                        ref="uniInput"
                        :placeholder="'Select UP'"
                        :search="'uni'"
                        :options="universityNames"
                        @updateFilter="updateUni">
                        <i class="fas fa-university"></i>
                    </AppViewPopupSelect>
                    <AppViewPopupSelect
                        ref="courseInput"
                        :placeholder="'Select Course'"
                        :search="'course'"
                        :options="courses"
                        @updateFilter="updateCourse">
                        <i class="fas fa-graduation-cap"></i>
                    </AppViewPopupSelect>
                </div>
                <div class="input-group">
                    <AppViewPopupSelect
                        ref="tagsInput"
                        :search="'tags'"
                        :mode="'tags'"
                        :options="tags"
                        :placeholder="'Add tags'"
                        @updateFilter="updateTags">
                        <i class="fas fa-tags"></i>
                    </AppViewPopupSelect>
                </div>
            </div>
            <div class="popup-controls">
                <div class="btn cancel" @click="closePopup">Cancel</div>
                <div class="btn action" @click="callEditImageData">
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
    name: 'AppPopupEditImageTags',
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
            imageData: {
                uni: '',
                course: '',
                tags: []
            }
        }
    },
    computed: mapGetters([
        'popup',
        'imgToEdit',
        'tags',
        'universities',
        'universityNames',
        'courses'
    ]),
    watch: {
        imgToEdit() {
            if (Object.keys(this.imgToEdit).length) {
                this.selectInputValue('uniInput', this.imgToEdit.up)
                this.selectInputValue('courseInput', this.imgToEdit.course)
                this.selectInputValue('tagsInput', this.imgToEdit.tags)
                setTimeout(() => {
                    this.setPopupIsLoading(false)
                }, 1000)
            }
        }
    },
    methods: {
        ...mapActions([
            'setPopup',
            'setCourses',
            'imagesRequest',
            'setImgToEdit'
        ]),
        closePopup() {
            this.setPopup({ isActive: false, type: '', isLoading: false })
            this.clearInputValues(), this.setImgToEdit({})
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
        selectInputValue(type, val) {
            const input = this.$refs[type]
            if (val.length) {
                if (type === 'tagsInput') {
                    Object.values(val).forEach((value) => {
                        const data = {
                            value: value,
                            label: value
                        }
                        input.$refs.multiselect.select(data)
                    })
                }
                if (type === 'uniInput') {
                    input.$refs.multiselect.select(val)
                }
                if (type === 'courseInput') {
                    setTimeout(() => {
                        input.$refs.multiselect.select(val)
                    }, 800)
                }
            }
        },
        clearInputValues() {
            Object.keys(this.$refs).forEach((input) => {
                this.$refs[input].$refs.multiselect.clear()
            })
        },
        clearCourseInput() {
            const courseInput = this.$refs.courseInput
            courseInput.$refs.multiselect.clear()
        },
        updateImageData(dataObj) {
            this.imageData[dataObj.search] = dataObj.value || ''
        },
        setPopupIsLoading(bool) {
            const popup = this.popup
            popup.isLoading = bool
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
            const data = this.imgToEdit
            data.up = this.imageData.uni
            data.course = this.imageData.course
            data.tags = this.imageData.tags
            return data
        },
        callEditImageData() {
            const ready = this.validateData()
            if (!ready) {
                return
            }
            this.setPopupIsLoading(true)
            const data = this.prepDataForUpload()
            this.imagesRequest({
                endpoint: 'editImageTags',
                data: data
            }).then(() => {
                this.closePopup()
            })
        }
    }
}
</script>

<style scoped lang="scss"></style>
