import axios from 'axios'

const state = {
    filter: {
        uni: '',
        course: '',
        keyword: ''
    },
    allImages: [],
    filteredImages: [],
    tags: [],
    filesToUpload: [],
    uploadImgData: {},
    imgToEdit: {}
}

const getters = {
    filter: (state) => state.filter,
    allImages: (state) => state.allImages,
    filteredImages: (state) => state.filteredImages,
    tags: (state) => state.tags,
    filesToUpload: (state) => state.filesToUpload,
    imgToEdit: (state) => state.imgToEdit
}

const actions = {
    setFilter: ({ commit }, obj) => {
        commit('setFilter', obj)
    },
    setAllImages: ({ commit }, arr) => {
        const sortedArr = actions.sortImagesInState(arr)
        commit('setAllImages', sortedArr)
    },
    setFilteredImages: ({ commit }, arr) => {
        commit('setFilteredImages', arr)
    },
    appendNewImage({ commit }, image) {
        const allImages = state.allImages
        allImages.push(image)
        actions.setAllImages({ commit }, allImages)
    },
    updataImages({ commit }, data) {
        const allImages = state.allImages
        let index = null
        allImages.forEach((img, i) => {
            if (img.id === data.image.id) {
                index = i
            }
        })
        if (data.type === 'inject') {
            allImages[index] = data.image
        } else {
            allImages.splice(index, 1)
        }
        actions.setAllImages({ commit }, allImages)
    },
    sortImagesInState(arr) {
        arr.sort((a, b) => {
            if (a.up < b.up) return -1
            if (a.up > b.up) return 1
            return 0
        })
        return arr
    },
    filterImagesInSate({ commit }) {
        const filterObj = state.filter
        const imgsArr = state.allImages
        const regex = new RegExp(filterObj.keyword, 'ig')
        const imgs = imgsArr.filter((img) => {
            const tags = img.tags.join(',')
            return (
                tags.match(regex) &&
                img.up.includes(filterObj.uni) &&
                img.course.includes(filterObj.course)
            )
        })
        actions.setFilteredImages({ commit }, imgs)
    },
    setImgToEdit: ({ commit }, obj) => {
        commit('setImgToEdit', obj)
    },
    setTags: ({ commit }, arr) => {
        commit('setTags', arr)
    },
    setFilesToUpload: ({ commit }, arr) => {
        commit('setFilesToUpload', arr)
    },
    setUploadImgData({ commit }, obj) {
        commit('setUploadImgData', obj)
    },
    formatData: (data) => {
        let formatedData = null
        if (data.endpoint === 'uploadImage') {
            formatedData = state.uploadImgData
        } else {
            const dataToSend = {
                path: 'images/' + data.endpoint
            }
            if (data.data) {
                dataToSend.data = data.data
            }
            formatedData = JSON.stringify(dataToSend)
        }
        return formatedData
    },
    imagesRequest: async ({ commit }, data = {}) => {
        if (!data.endpoint.length) {
            console.error('Error: Improper request format')
            return
        }
        const options = {
            method: 'POST',
            data: actions.formatData(data)
        }
        try {
            const resp = await axios.request(options)
            if (resp.data.status === 'Success: 200 (Fetched all images)') {
                actions.setAllImages({ commit }, resp.data.body)
                actions.setFilteredImages({ commit }, resp.data.body)
            }
            if (resp.data.status === 'Success: 200 (Fetched all tags)') {
                actions.setTags({ commit }, resp.data.body)
            }
            if (resp.data.status === 'Success: 200 (Image uploaded)') {
                actions.appendNewImage({ commit }, resp.data.body)
                actions.filterImagesInSate({ commit })
                actions.setFilesToUpload({ commit }, [])
            }
            if (resp.data.status === 'Success: 200 (Image VSG data upadated)') {
                const data = {
                    image: resp.data.body,
                    type: 'inject'
                }
                actions.updataImages({ commit }, data)
                actions.filterImagesInSate({ commit })
            }
            if (resp.data.status === 'Success: 200 (Image tags updated)') {
                const data = {
                    image: resp.data.body,
                    type: 'inject'
                }
                actions.updataImages({ commit }, data)
                actions.filterImagesInSate({ commit })
            }
            if (resp.data.status === 'Success: 200 (Image deleted)') {
                const data = {
                    image: resp.data.body,
                    type: 'remove'
                }
                actions.updataImages({ commit }, data)
                actions.filterImagesInSate({ commit })
            }
            if (resp.data.status === 'Success: 200 (Link generated)') {
                return resp.data.body
            }

            // Server script error
            if (resp.data.status === 'Error: 400 (Bad request)') {
                throw new Error(resp.data.status)
            }
        } catch (err) {
            alert('Oops! Something went wrong. Please refresh and try again.')
            console.error(err)
        }
    }
}

const mutations = {
    setFilter: (state, obj) => (state.filter = obj),
    setAllImages: (state, arr) => (state.allImages = arr),
    setFilteredImages: (state, arr) => (state.filteredImages = arr),
    setTags: (state, arr) => (state.tags = arr),
    setFilesToUpload: (state, arr) => (state.filesToUpload = arr),
    setUploadImgData: (state, obj) => (state.uploadImgData = obj),
    setImgToEdit: (state, obj) => (state.imgToEdit = obj)
}

export default {
    state,
    getters,
    actions,
    mutations
}
