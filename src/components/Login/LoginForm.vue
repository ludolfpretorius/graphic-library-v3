<template>
    <div id="LoginForm">
        <div class="input-group">
            <i class="fas fa-lock"></i>
            <input
                ref="input"
                type="password"
                placeholder="Enter password"
                name="password"
                required
                data-lpignore="true"
                v-model="requestData.password"
                @keyup.enter="callRequest" />
        </div>
        <div class="submit-button flex-center" @click="callRequest">
            <img
                src="@/assets/imgs/loader.svg"
                alt="loader"
                class="loader"
                v-if="isLoading" />
            <i className="fas fa-sign-in-alt" v-else></i>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'LoginForm',
    data() {
        return {
            isLoading: false,
            requestData: {
                password: ''
            }
        }
    },
    methods: {
        ...mapActions(['authRequest', 'setLoginAttemptFailed']),
        validateData() {
            const data = this.requestData
            if (!data.password.length) {
                alert('Please enter enter a password before submitting.')
                return false
            }
            return true
        },
        callRequest() {
            const ready = this.validateData()
            if (!ready) {
                return
            }
            if (this.isLoading) {
                return
            }
            this.isLoading = true
            this.setLoginAttemptFailed(false)
            this.authRequest({
                endpoint: 'login',
                data: this.requestData
            }).then((success) => {
                if (success) {
                    this.$router.push('/app')
                }
                this.isLoading = false
            })
        }
    },
    mounted() {
        this.$refs.input.focus()
    }
}
</script>

<style scoped lang="scss">
#LoginForm {
    width: 400px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    position: relative;
    .input-group {
        width: 100%;
        i {
            height: 18px;
            margin: auto;
            color: #ccc;
            display: block;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 20px;
        }
        input {
            height: 60px;
            width: 100%;
            padding: 10px 20px 12px 45px;
            background-color: #fff;
            border: none;
            border-radius: 10px;
            border: 1px solid $borderGrey;
            outline: 0px solid rgba(0, 0, 0, 0);
            // box-shadow: $boxShadowSmall;
            font-family: Sen, Arial, sans-serif;
            font-size: 16px;
            transition: $animateFast;
            &:hover {
                border-color: darken($borderGrey, 10%);
            }
            &:focus {
                border-color: darken($borderGrey, 20%);
                box-shadow: inset 0 1px #ddd;
                outline: 3px solid rgba(0, 0, 0, 0.08);
            }
        }
    }
    .submit-button {
        width: 50px;
        height: 50px;
        margin: auto;
        background-color: transparent;
        border: none;
        font-size: 20px;
        color: $green;
        position: absolute;
        right: 10px;
        top: 0;
        bottom: 0;
        cursor: pointer;
        transition: $animateFast;
        &:hover {
            color: darken($green, 10%);
        }
        .loader {
            width: 50px;
            height: 50px;
            margin: auto;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            pointer-events: none;
        }
    }
}
</style>
