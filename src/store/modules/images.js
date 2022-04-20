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
    tags: []
}

const getters = {
    filter: (state) => state.filter,
    allImages: (state) => state.allImages,
    filteredImages: (state) => state.filteredImages,
    visibleImages: (state) => state.visibleImages,
    tags: (state) => state.tags
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
        actions.setVisibleImages({ commit }, arr)
    },
    setVisibleImages: ({ commit }, arr) => {
        commit('setVisibleImages', arr.slice(0, 100))
    },
    setTags: ({ commit }, arr) => {
        commit('setTags', arr)
    },
    imagesRequest: async ({ commit }, file = '') => {
        if (!file.length) {
            return
        }
        const options = {
            method: 'POST',
            data: JSON.stringify({
                path: 'images/' + file
            })
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
    setTags: (state, arr) => (state.tags = arr)
}

export default {
    state,
    getters,
    actions,
    mutations
}
