import { createStore } from 'vuex'
import images from './modules/images'
import ui from './modules/ui'
import universities from './modules/universities'

export default createStore({
    modules: {
        ui,
        images,
        universities
    }
})
