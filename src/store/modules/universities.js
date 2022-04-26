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
        const sortedUnies = actions.sortUniversitiesInState(arr)
        commit('setUniversities', sortedUnies)
        actions.setUniversityNames({ commit }, sortedUnies)
    },
    setUniversityNames({ commit }, arr) {
        const acronymArr = arr.map((uni) => {
            return {
                value: uni.acronym,
                label: uni.acronym
            }
        })
        commit('setUniversityNames', acronymArr)
    },
    setCourses: ({ commit }, str) => {
        if (!str.length) {
            commit('setCourses', [])
            return
        }
        const uni = state.universities.filter((uni) => {
            return uni.acronym.includes(str)
        })
        const sortedCourses = uni[0].courses
        sortedCourses.sort()
        const courses = sortedCourses.map((course) => {
            return {
                value: course,
                label: course
            }
        })
        commit('setCourses', courses)
    },
    updateUniversities({ commit }, data) {
        const allUnies = state.universities
        let index = null
        allUnies.forEach((uni, i) => {
            if (uni.id === data.uni.id) {
                index = i
            }
        })
        if (data.type === 'inject') {
            allUnies.splice(index, 1, data.uni)
        } else {
            allUnies.splice(index, 1)
        }
        actions.setUniversities({ commit }, allUnies)
    },
    sortUniversitiesInState(arr) {
        arr.sort((a, b) => {
            if (a.acronym < b.acronym) return -1
            if (a.acronym > b.acronym) return 1
            return 0
        })
        return arr
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
        const notificationData = {
            isActive: true,
            status: 'success'
        }
        try {
            const resp = await axios.request(options)
            if (
                resp.data.status === 'Success: 200 (Fetched all universities)'
            ) {
                actions.setUniversities({ commit }, resp.data.body)
            }
            if (resp.data.status === 'Success: 200 (New university added)') {
                actions.setUniversities({ commit }, resp.data.body)
            }
            if (resp.data.status === 'Success: 200 (New course added)') {
                actions.setUniversities({ commit }, resp.data.body)
            }
            if (resp.data.status === 'Success: 200 (University deleted)') {
                const data = {
                    uni: resp.data.body,
                    type: 'remove'
                }
                actions.updateUniversities({ commit }, data)
            }
            if (resp.data.status === 'Success: 200 (Course deleted)') {
                const data = {
                    uni: resp.data.body,
                    type: 'inject'
                }
                actions.updateUniversities({ commit }, data)
            }

            // Fire notification
            if (
                resp.data.status.includes('Success') &&
                !resp.data.status.includes('Fetched all universities')
            ) {
                const msg = resp.data.status.split(/[(]|[)]/)
                notificationData.message = msg[1]
                commit('setNotification', notificationData, { root: true })
            }

            // Server script error
            if (resp.data.status === 'Error: 400 (Bad request)') {
                throw new Error(resp.data.status)
            }
        } catch (err) {
            notificationData.status = 'error'
            notificationData.message =
                'Something went wrong. Please check your connection.'
            commit('setNotification', notificationData, { root: true })
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
