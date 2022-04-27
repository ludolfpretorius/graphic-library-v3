import { createStore } from 'vuex'
import images from './modules/images'
import ui from './modules/ui'
import universities from './modules/universities'
import guest from './modules/guest'

export default createStore({
    modules: {
        ui,
        images,
        universities,
        guest
    }
})
