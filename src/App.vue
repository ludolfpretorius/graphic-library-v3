<template>
    <router-view />
    <div id="loading-screen" ref="preContentLoader">
        <div class="content-wrap">
            <img src="@/assets/imgs/2ulogo.svg" alt="2U logo" class="logo-2u" />
            <img src="@/assets/imgs/cslogo.svg" alt="CS logo" class="logo-cs" />
            <h3>Graphic Library</h3>
            <img src="@/assets/imgs/loader.svg" alt="loader" />
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        window.addEventListener('load', () => {
            this.$refs.preContentLoader.remove()
        })
    }
}
</script>

<style lang="scss">
@import './assets/styles/_default.css';
#loading-screen {
    width: 100vw;
    height: 100vh;
    // margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .content-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        .logo-2u {
            width: 100px;
            height: auto;
            margin-bottom: 40px;
        }
        .logo-cs {
            width: 470px;
            height: auto;
        }
        h3 {
            margin: 15px 0 20px 0;
            color: $black;
            font-size: 25px;
            text-align: center;
            letter-spacing: 2px;
        }
    }
}
</style>
