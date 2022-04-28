<template>
    <div class="AppViewPopupSelect">
        <slot>
            <i class="fas fa-search"></i>
        </slot>
        <Multiselect
            ref="multiselect"
            :mode="mode"
            :options="options"
            :placeholder="placeholder"
            :search="search"
            :searchable="true"
            @change="emitVal" />
    </div>
</template>

<script>
export default {
    name: 'AppViewPopupSelect',
    props: {
        mode: {
            type: String,
            default: 'single'
        },
        options: {
            type: Array,
            required: true
        },
        placeholder: {
            type: String,
            default: 'Select option'
        },
        search: {
            type: String,
            default: ''
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
.AppViewPopupSelect {
    width: 100%;
    height: 50px;
    margin: 0 10px;
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
