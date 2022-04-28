<template>
    <div id="AppDash">
        <AppPopup v-show="popup.isActive" />
        <AppNotification />
        <AppSidebar />
        <AppView />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppNotification from '@/components/AppDash/AppNotification/AppNotification'
import AppPopup from '@/components/AppDash/AppPopup/AppPopup'
import AppSidebar from '@/components/AppDash/AppSidebar/AppSidebar'
import AppView from '@/components/AppDash/AppView/AppView'

export default {
    name: 'AppDash',
    components: {
        AppNotification,
        AppPopup,
        AppSidebar,
        AppView
    },
    data() {
        return {}
    },
    computed: mapGetters(['popup']),
    methods: {
        ...mapActions(['universitiesRequest', 'imagesRequest'])
    },
    created() {
        this.universitiesRequest({ endpoint: 'fetchAll' })
        this.imagesRequest({ endpoint: 'fetchTags' })
    }
}
</script>

<style scoped lang="scss">
#AppDash {
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
}
</style>
