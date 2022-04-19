const state = {
    popup: {
        isActive: false,
        type: ''
    }
}

const getters = {
    popup: (state) => state.popup
}

const actions = {
    setPopup: ({ commit }, obj) => {
        commit('setPopup', obj)
    }
}

const mutations = {
    setPopup: (state, obj) => (state.popup = obj)
}

export default {
    state,
    getters,
    actions,
    mutations
}
