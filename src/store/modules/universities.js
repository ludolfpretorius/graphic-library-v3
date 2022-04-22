import axios from 'axios'

const state = {
    universities: [],
    universityNames: [],
    courses: []
}

const getters = {
    universities: (state) => state.universities,
    universityNames: (state) => state.universityNames,
    courses: (state) => state.courses
}

const actions = {
    setUniversities: ({ commit }, arr) => {
        commit('setUniversities', arr)
    },
    setUniversityNames({ commit }, arr) {
        const data = arr.map((uni) => {
            return uni.acronym
        })
        commit('setUniversityNames', data)
    },
    setCourses: ({ commit }, str) => {
        if (!str.length) {
            commit('setCourses', [])
            return
        }
        const uni = state.universities.filter((uni) => {
            return uni.acronym.includes(str)
        })
        commit('setCourses', uni[0].courses)
    },
    formatUniData: (data) => {
        const formatedData = {
            path: 'universities/' + data.endpoint
        }
        if (data.data) {
            formatedData.data = data.data
        }
        return JSON.stringify(formatedData)
    },
    universitiesRequest: async ({ commit }, data = {}) => {
        if (!data.endpoint.length) {
            console.error('Error: Improper request format')
            return
        }
        const options = {
            method: 'POST',
            data: actions.formatUniData(data)
        }
        try {
            const resp = await axios.request(options)
            if (
                resp.data.status === 'Success: 200 (Fetched all universities)'
            ) {
                actions.setUniversities({ commit }, resp.data.body)
                actions.setUniversityNames({ commit }, resp.data.body)
            }
            if (resp.data.status === 'Success: 200 (New university added)') {
                actions.setUniversities({ commit }, resp.data.body)
                actions.setUniversityNames({ commit }, resp.data.body)
            }
            if (resp.data.status === 'Success: 200 (New course added)') {
                actions.setUniversities({ commit }, resp.data.body)
                actions.setUniversityNames({ commit }, resp.data.body)
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
    setUniversities: (state, arr) => (state.universities = arr),
    setUniversityNames: (state, arr) => (state.universityNames = arr),
    setCourses: (state, arr) => (state.courses = arr)
}

export default {
    state,
    getters,
    actions,
    mutations
}
