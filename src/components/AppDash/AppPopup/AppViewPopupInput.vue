<template>
    <div id="AppViewPopupInput">
        <slot>
            <i class="fas fa-search"></i>
        </slot>
        <input
            :search="search"
            type="text"
            v-model="value"
            :placeholder="placeholder"
            @keyup="emitVal" />
    </div>
</template>

<script>
export default {
    name: 'AppViewPopupInput',
    props: {
        placeholder: {
            type: String,
            default: 'Type something'
        },
        search: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            value: ''
        }
    },
    methods: {
        emitVal() {
            const search = this.search
            const value = this.value
            this.$emit('updateData', { search, value })
        }
    }
}
</script>

<style scoped lang="scss">
#AppViewPopupInput {
    width: 100%;
    position: relative;
    margin: 0 10px;
    :slotted(i) {
        height: 18px;
        margin: auto;
        color: #ccc;
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 20px;
        z-index: 1;
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
