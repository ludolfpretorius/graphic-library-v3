import axios from 'axios'

const state = {
    filter: {
        uni: '',
        course: '',
        keyword: ''
    },
    allImages: [],
    filteredImages: [],
    visibleImages: [],
    tags: [],
    filesToUpload: [],
    uploadImgData: {}
}

const getters = {
    filter: (state) => state.filter,
    allImages: (state) => state.allImages,
    filteredImages: (state) => state.filteredImages,
    visibleImages: (state) => state.visibleImages,
    tags: (state) => state.tags,
    filesToUpload: (state) => state.filesToUpload
}

const actions = {
    setFilter: ({ commit }, obj) => {
        commit('setFilter', obj)
    },
    setAllImages: ({ commit }, arr) => {
        commit('setAllImages', arr)
    },
    setFilteredImages: ({ commit }, arr) => {
        commit('setFilteredImages', arr)
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
                actions.setAllImages({ commit }, resp.data.body)
                actions.filterImagesInSate({ commit })
            }
            if (resp.data.status === 'Success: 200 (Image deleted)') {
                actions.setAllImages({ commit }, resp.data.body)
                actions.filterImagesInSate({ commit })
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
    setVisibleImages: (state, arr) => (state.visibleImages = arr),
    setTags: (state, arr) => (state.tags = arr),
    setFilesToUpload: (state, arr) => (state.filesToUpload = arr),
    setUploadImgData: (state, obj) => (state.uploadImgData = obj)
}

export default {
    state,
    getters,
    actions,
    mutations
}
