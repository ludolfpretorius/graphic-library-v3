<template>
    <form id="LoginForm" action="#" method="POST" @submit.prevent="submitForm">
        <input
            type="password"
            placeholder="Enter password"
            name="password"
            required
            data-lpignore="true" />
        <button type="submit" name="submit">
            <i className="fas fa-sign-in-alt"></i>
        </button>
    </form>
</template>

<script>
export default {
    name: 'LoginForm',
    data() {
        return {}
    },
    methods: {
        submitForm() {}
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
    input {
        height: 60px;
        width: 100%;
        padding: 10px 20px;
        background-color: #fff;
        border: none;
        border-radius: 10px;
        border: 1px solid #ccc;
        // box-shadow: $boxShadow;
        outline: 3px solid rgba(68, 138, 255, 0);
        font-size: 16px;
        transition: $animateFast;
        &:focus {
            outline-color: rgba(68, 138, 255, 0.4);
        }
    }
    button {
        width: 50px;
        height: 50px;
        margin: auto;
        background-color: transparent;
        border: none;
        outline: 3px solid rgba(68, 138, 255, 0);
        font-size: 20px;
        color: #3bdaa0;
        position: absolute;
        right: 10px;
        top: 1px;
        bottom: 0;
        cursor: pointer;
        &:focus {
            outline-color: rgba(68, 138, 255, 0.4);
        }
    }
}
</style>
