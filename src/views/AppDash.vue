<template>
    <div id="AppDash">
        <AppPopup v-show="popup.isActive" />
        <AppSidebar />
        <AppView />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppPopup from '@/components/AppDash/AppPopup/AppPopup'
import AppSidebar from '@/components/AppDash/AppSidebar/AppSidebar'
import AppView from '@/components/AppDash/AppView/AppView'

export default {
    name: 'AppDash',
    components: {
        AppPopup,
        AppSidebar,
        AppView
    },
    data() {
        return {}
    },
    computed: mapGetters(['popup']),
    methods: {
        ...mapActions(['universitiesRequest'])
    },
    created() {
        this.universitiesRequest({ endpoint: 'fetchAll' })
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
