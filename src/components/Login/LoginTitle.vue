<template>
    <div id="LoginTitle">
        <img src="@/assets/imgs/2ulogo.svg" alt="2U logo" class="logo-2u" />
        <img src="@/assets/imgs/cslogo.svg" alt="CS logo" class="logo-cs" />
        <h3>Graphic Library</h3>
    </div>
</template>

<script>
export default {
    name: 'LoginTitle'
}
</script>

<style scoped lang="scss">
#LoginTitle {
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
        margin: 15px 0 40px 0;
        color: $black;
        font-size: 25px;
        text-align: center;
        letter-spacing: 2px;
    }
}
</style>
