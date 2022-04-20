import { createStore } from 'vuex'
import images from './modules/images'
import popup from './modules/popup'
import universities from './modules/universities'

export default createStore({
    modules: {
        images,
        popup,
        universities
    }
})
