<template>
    <div id="AppViewContentDropzone">
        <div
            class="image-preview"
            v-if="
                popup.isActive && popup.type === 'upload-image' && files.length
            ">
            <img
                v-for="blob in imgBlobs"
                :key="imgBlobs.indexOf(blob)"
                :src="blob"
                alt="Image preview" />
        </div>
        <div class="dropzone-upload-area" v-bind="getRootProps()" v-else>
            <input v-bind="getInputProps()" />
            <img
                class="placeholder-image"
                src="@/assets/imgs/img.svg"
                alt="Placeholder image" />
            <span v-if="isDragActive">{{
                getResponse('dropResponse', dropResponses)
            }}</span>
            <span v-else>{{ getResponse('dragResponse', dragResponses) }}</span>
        </div>
    </div>
</template>

<script>
import { mapGetters, useStore } from 'vuex'
import { useDropzone } from 'vue3-dropzone'
import { ref } from 'vue'

export default {
    name: 'AppViewContentDropzone',
    // props: {
    //     isUploading: {
    //         type: Boolean,
    //         default: false
    //     }
    // },
    data() {
        return {
            dragResponses: [
                'Upload image here',
                'You going to upload something or not?',
                "You're supposed to upload stuff, you know",
                'Onion rings are just vegetable donuts',
                'I’d give you a cookie, but I ate it',
                'C is for cookie. That’s good enough for me.',
                'Upload image here',
                'Gimme SVGEEEZ!!!',
                'Upload something... I dare you.'
            ],
            dropResponses: [
                "Drop it... coz it's hot, of course",
                'Drop that bad boy!',
                'Gimme gimme gimme!!',
                'Get in mah belly!',
                'Nom nom nom...',
                'Waaiiit!!!... Just kidding. Drop that shit.',
                'Early bird gets the worm, but all I want is SVGEEEZ!!!'
            ]
        }
    },
    computed: mapGetters(['popup']),
    methods: {
        getResponse(name, responsesSrc) {
            if (sessionStorage[name]) {
                return sessionStorage[name]
            }
            const index = Math.floor(Math.random() * responsesSrc.length)
            sessionStorage[name] = responsesSrc[index]
            return responsesSrc[index]
        }
    },
    setup() {
        const store = useStore()
        const imgBlobs = ref([])
        const files = ref([])

        function onDrop(acceptFiles, rejectReasons) {
            console.log(rejectReasons)
            imgBlobs.value = []
            if (acceptFiles.length) {
                files.value = acceptFiles
                acceptFiles.forEach((file) => {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.addEventListener('load', () => {
                        imgBlobs.value.push(reader.result)
                    })
                })
            }
            store.dispatch('setPopup', { isActive: true, type: 'upload-image' })
            store.dispatch('setFilesToUpload', acceptFiles)
        }

        const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop })

        return {
            getRootProps,
            getInputProps,
            imgBlobs,
            files,
            ...rest
        }
    }
}
</script>

<style scoped lang="scss">
#AppViewContentDropzone {
    flex: 1 0 auto;
    width: 180px;
    max-width: 250px;
    height: 180px;
    padding: 10px;
    margin: 15px;
    border: 2px dashed $blue;
    border-radius: 20px;
    outline: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    div[role='button'] {
        height: 100%;
        padding: 4px;
        display: flex;
    }
    .thumb-preview {
        width: 100%;
        height: 100%;
        margin: auto;
        background-color: $backgroundGrey;
        border-radius: 20px;
        display: none;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        pointer-events: none;
        overflow: hidden;
        img {
            flex: 0 1 auto;
            width: 60%;
            height: auto;
        }
        &.show-preview {
            display: flex;
        }
    }
    .dropzone-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        pointer-events: none;
        img {
            width: 60%;
            height: auto;
            margin-top: -25px;
        }
        span {
            margin-top: -10px;
            color: #aaa;
        }
    }
    .dropzone-upload-area {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        .placeholder-image {
            width: 60%;
            height: auto;
            margin-top: -25px;
        }
        span {
            padding: 0 5px;
            margin-top: -10px;
            color: #aaa;
            line-height: 22px;
        }
    }
    .image-preview {
        width: 100%;
        height: 100%;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
}
</style>
