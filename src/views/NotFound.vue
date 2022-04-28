<template>
    <div id="NotFound">
        <h2>Hmmm... This page doesn't exist.</h2>
        <router-link to="/" class="btn">Go back home</router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style scoped lang="scss">
#NotFound {
    margin-top: 200px;
    text-align: center;
    h2 {
        margin-bottom: 40px;
    }
    .btn {
        width: 200px;
        padding: 16px 20px;
        background-color: $blue;
        border: none;
        border-radius: 10px;
        outline: 0px solid rgba(68, 138, 255, 0.4);
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        color: #fff;
        text-decoration: none;
        cursor: pointer;
    }
}
</style>
