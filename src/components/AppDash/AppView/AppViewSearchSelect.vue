<template>
    <div class="AppViewSearchSelect">
        <slot>
            <i class="fas fa-search"></i>
        </slot>
        <Multiselect
            ref="multiselect"
            :options="options"
            :placeholder="placeholder"
            :search="search"
            :searchable="true"
            @change="emitVal" />
    </div>
</template>

<script>
export default {
    name: 'AppViewSearchSelect',
    props: {
        options: {
            type: Array
        },
        placeholder: {
            type: String,
            default: 'Select option'
        },
        search: {
            type: String
        }
    },
    methods: {
        emitVal(value) {
            const search = this.search
            this.$emit('updateFilter', { search, value })
        }
    }
}
</script>

<style lang="scss" src="@/assets/styles/_multiselect.scss"></style>
<style scoped lang="scss">
.AppViewSearchSelect {
    width: 200px;
    height: 50px;
    margin: 0 20px 0 0;
    position: relative;
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
    > div {
        height: 100%;
    }
}
</style>
