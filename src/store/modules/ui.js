const state = {
    popup: {
        isActive: false,
        isLoading: false,
        type: ''
    },
    notification: {
        isActive: false,
        status: 'success',
        message: 'On things you did'
    }
}

const getters = {
    popup: (state) => state.popup,
    notification: (state) => state.notification
}

const actions = {
    setPopup: ({ commit }, obj) => {
        commit('setPopup', obj)
    },
    setNotification: ({ commit }, obj) => {
        commit('setNotification', obj)
    }
}

const mutations = {
    setPopup: (state, obj) => (state.popup = obj),
    setNotification: (state, obj) => (state.notification = obj)
}

export default {
    state,
    getters,
    actions,
    mutations
}
