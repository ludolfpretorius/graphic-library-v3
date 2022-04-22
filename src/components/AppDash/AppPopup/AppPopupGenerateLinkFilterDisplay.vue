<template>
    <div id="AppPopupGenerateLinkFilterDisplay" class="flex-center">
        <div class="filter-section">
            <i class="fas fa-university"></i>
            <span>
                <span>UP:&nbsp;</span>
                <strong :class="{ green: filter.uni }">{{
                    filter.uni || 'none'
                }}</strong></span
            >
        </div>
        <div class="filter-section">
            <i class="fas fa-graduation-cap"></i>
            <span>
                <span>Course:&nbsp;</span>
                <strong :class="{ green: filter.course }">{{
                    filter.course || 'none'
                }}</strong></span
            >
        </div>
        <div class="filter-section">
            <i class="fas fa-tags"></i>
            <span>
                <span>Keyword:&nbsp;</span>
                <strong :class="{ green: filter.keyword }">{{
                    keyword
                }}</strong></span
            >
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppPopupGenerateLinkFilterDisplay',
    props: {
        filter: {
            type: Object,
            required: true
        }
    },
    computed: {
        keyword() {
            if (this.filter.keyword.length > 13) {
                const snippedVal = this.filter.keyword.slice(0, 10) + '...'
                console.log(snippedVal)
                return snippedVal
            }
            return this.filter.keyword || 'none'
        }
    }
}
</script>

<style scoped lang="scss">
#AppPopupGenerateLinkFilterDisplay {
    width: 100%;
    margin: 0 10px;
    .filter-section {
        flex: 1;
        width: 100%;
        height: 50px;
        padding: 10px 20px;
        margin: 0 auto;
        border: 1px solid $borderGrey;
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &:first-child {
            border-right: none;
            border-radius: 10px 0 0 10px;
        }
        &:last-child {
            border-left: none;
            border-radius: 0 10px 10px 0;
        }
        i {
            height: 18px;
            margin-right: 10px;
            color: #ccc;
        }
        > span {
            overflow: hidden;
            display: flex;
            align-items: center;
            strong {
                padding: 2px 6px;
                background-color: $red;
                border-radius: 6px;
                color: #fff;
                overflow: hidden;
                &.green {
                    background-color: darken($green, 5%);
                }
            }
        }
    }
}
</style>
