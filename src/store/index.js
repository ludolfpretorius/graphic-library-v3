import { createStore } from 'vuex'
import images from './modules/images'
import popup from './modules/popup'

export default createStore({
    modules: {
        images,
        popup
    }
})
