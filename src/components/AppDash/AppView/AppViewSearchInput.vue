<template>
    <div id="AppViewSearchInput">
        <i class="fas fa-search"></i>
        <input
            type="text"
            placeholder="Search keywords"
            id="searchInput"
            autoComplete="off"
            :search="search"
            @keyup="emitVal" />
    </div>
</template>

<script>
export default {
    name: 'AppViewSearchInput',
    props: {
        search: {
            type: String
        }
    },
    data() {
        return {}
    },
    methods: {
        emitVal() {
            const search = this.search
            const value = event.target.value
            this.$emit('updateFilter', { search, value })
        }
    }
}
</script>

<style scoped lang="scss">
#AppViewSearchInput {
    width: 400px;
    position: relative;
    margin: 0 20px 0 0;
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
        height: 50px;
        width: 100%;
        padding: 10px 20px 10px 45px;
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
</style>
