import axios from 'axios'

const state = {
    tokenIsValid: false,
    guest: {},
    guestFilter: {
        keyword: ''
    },
    allGuestImages: [],
    filteredGuestImages: []
}

const getters = {
    tokenIsValid: (state) => state.tokenIsValid,
    guest: (state) => state.guest,
    guestFilter: (state) => state.filter,
    allGuestImages: (state) => state.allGuestImages,
    filteredGuestImages: (state) => state.filteredGuestImages
}

const actions = {
    sortGuestImagesInState(arr) {
        arr.sort((a, b) => {
            if (a.up < b.up) return -1
            if (a.up > b.up) return 1
            return 0
        })
        return arr
    },
    setTokenIsValid: ({ commit }, bool) => {
        commit('setTokenIsValid', bool)
    },
    setGuest: ({ commit }, obj) => {
        commit('setGuest', obj)
    },
    setGuestFilter: ({ commit }, obj) => {
        commit('setGuestFilter', obj)
    },
    setAllGuestImages: ({ commit }, arr) => {
        const sortedArr = actions.sortGuestImagesInState(arr)
        commit('setAllGuestImages', sortedArr)
    },
    setFilteredGuestImages: ({ commit }, arr) => {
        commit('setFilteredGuestImages', arr)
    },
    formatData: (data) => {
        let formatedData = null
        if (data.endpoint === 'uploadImage') {
            formatedData = state.uploadImgData
        } else {
            const dataToSend = {
                path: 'guest/' + data.endpoint
            }
            if (data.data) {
                dataToSend.data = data.data
            }
            formatedData = JSON.stringify(dataToSend)
        }
        return formatedData
    },
    guestRequest: async ({ commit }, data = {}) => {
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
            if (resp.data.status === 'Success: 200 (Guest is valid)') {
                actions.setTokenIsValid({ commit }, true)
                actions.setGuest({ commit }, resp.data.body)
            }
            if (resp.data.status === 'Success: 200 (Fetched guest images)') {
                actions.setAllGuestImages({ commit }, resp.data.body)
                actions.setFilteredGuestImages({ commit }, resp.data.body)
            }
            if (resp.data.status === 'Success: 200 (Link expired)') {
                actions.setTokenIsValid({ commit }, false)
                actions.setGuest({ commit }, {})
                actions.setAllGuestImages({ commit }, [])
                actions.setFilteredGuestImages({ commit }, [])
            }

            // Server script error
            if (resp.data.status === 'Error: 400 (Bad request)') {
                console.error(resp.data.status)
            }
        } catch (err) {
            alert('Something went wrong. Please check your connection.')
            console.error(err)
        }
    }
}

const mutations = {
    setGuest: (state, obj) => (state.guest = obj),
    setTokenIsValid: (state, bool) => (state.tokenIsValid = bool),
    setGuestFilter: (state, obj) => (state.guestFilter = obj),
    setAllGuestImages: (state, arr) => (state.allGuestImages = arr),
    setFilteredGuestImages: (state, arr) => (state.filteredGuestImages = arr)
}

export default {
    state,
    getters,
    actions,
    mutations
}
