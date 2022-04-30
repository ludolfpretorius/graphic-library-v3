import axios from 'axios'

const state = {
    loginAttemptFailed: false,
    hasLoggedIn: false,
    user: {
        isAdmin: false
    }
}

const getters = {
    user: (state) => state.user,
    loginAttemptFailed: (state) => state.loginAttemptFailed,
    hasLoggedIn: (state) => state.hasLoggedIn
}

const actions = {
    setUser: ({ commit }, obj) => {
        commit('setUser', obj)
    },
    setLoginAttemptFailed: ({ commit }, bool) => {
        commit('setLoginAttemptFailed', bool)
    },
    setHasLoggedIn: ({ commit }, bool) => {
        commit('setHasLoggedIn', bool)
    },
    formatAuthData: (data) => {
        const formatedData = {
            path: 'authentication/' + data.endpoint
        }
        if (data.data) {
            formatedData.data = data.data
        }
        return JSON.stringify(formatedData)
    },
    authRequest: async ({ commit }, data = {}) => {
        if (!data.endpoint.length) {
            console.error('Error: Improper request format')
            return
        }
        const options = {
            method: 'POST',
            data: actions.formatAuthData(data)
        }
        const notificationData = {
            isActive: true,
            status: 'success'
        }
        try {
            const resp = await axios.request(options)
            if (resp.data.status === 'Success: 200 (Logged in)') {
                actions.setUser(
                    { commit },
                    {
                        isAdmin: resp.data.body.user === 2 ? true : false
                    }
                )
                actions.setHasLoggedIn({ commit }, true)
                return true
            }
            if (resp.data.status === 'Success: 200 (Logged out)') {
                actions.setUser({ commit }, { isAdmin: false })
                actions.setHasLoggedIn({ commit }, false)
                return true
            }
            if (
                resp.data.status === 'Success: 200 (Default password changed)'
            ) {
                notificationData.message = resp.data.status.split(/[(]|[)]/)[1]
                commit('setNotification', notificationData, { root: true })
                return true
            }
            if (resp.data.status === 'Success: 200 (Admin password changed)') {
                notificationData.message = resp.data.status.split(/[(]|[)]/)[1]
                commit('setNotification', notificationData, { root: true })
                return true
            }
            if (resp.data.status === 'Error: 400 (Incorrect password)') {
                actions.setLoginAttemptFailed({ commit }, true)
                return false
            }

            if (resp.data.status === 'Error: 400 (Bad request)') {
                notificationData.status = 'error'
                notificationData.message = 'That last request was unsuccessful.'
                commit('setNotification', notificationData, { root: true })
            }
        } catch (err) {
            alert('Something went wrong. Please check your connection.')
            console.error(err)
        }
    }
}

const mutations = {
    setUser: (state, obj) => (state.user = obj),
    setLoginAttemptFailed: (state, bool) => (state.loginAttemptFailed = bool),
    setHasLoggedIn: (state, bool) => (state.hasLoggedIn = bool)
}

export default {
    state,
    getters,
    actions,
    mutations
}
