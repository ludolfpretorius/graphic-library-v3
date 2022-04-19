<template>
    <div id="Login">
        <LoginTitle />
        <LoginForm />
        <LoginAlert />
    </div>
</template>

<script>
import LoginTitle from '@/components/Login/LoginTitle'
import LoginForm from '@/components/Login/LoginForm'
import LoginAlert from '@/components/Login/LoginAlert'

export default {
    name: 'Login',
    components: {
        LoginTitle,
        LoginForm,
        LoginAlert
    }
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
