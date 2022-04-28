<template>
    <div id="Login">
        <LoginTitle />
        <LoginForm />
        <LoginAlert :show="loginAttemptFailed" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginTitle from '@/components/Login/LoginTitle'
import LoginForm from '@/components/Login/LoginForm'
import LoginAlert from '@/components/Login/LoginAlert'

export default {
    name: 'Login',
    components: {
        LoginTitle,
        LoginForm,
        LoginAlert
    },
    computed: mapGetters(['loginAttemptFailed'])
}
</script>

<style scoped lang="scss">
#Login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    flex-direction: column;
}
</style>
