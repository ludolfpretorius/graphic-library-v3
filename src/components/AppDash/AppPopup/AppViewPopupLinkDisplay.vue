<template>
    <div id="AppViewPopupLinkDisplay">
        <slot>
            <i class="fas fa-link"></i>
        </slot>
        <div class="link-display">
            <span ref="previewText">{{ snippedLinkDisplayText }}</span>
            <div :class="{ btn: true, disable: btnDisabled }" @click="copyText">
                Copy link
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppViewPopupLinkDisplay',
    props: {
        placeholder: {
            type: String,
            default: 'To be displayed here'
        },
        btnDisabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    },
    computed: {
        snippedLinkDisplayText() {
            if (this.placeholder.length > 57) {
                return this.placeholder.slice(0, 54) + '...'
            }
            return this.placeholder
        }
    },
    methods: {
        copyText(event) {
            const selection = window.getSelection()
            const range = document.createRange()
            const btn = event.target
            const previewText = this.$refs.previewText

            navigator.clipboard.writeText(this.placeholder)
            document.execCommand('copy')
            range.selectNodeContents(previewText)
            selection.removeAllRanges()
            selection.addRange(range)

            btn.innerText = 'Copied!'
            btn.style.backgroundColor = '#3BDAA0'

            this.$emit('copied')

            setTimeout(() => {
                btn.innerText = 'Copy link'
                btn.style.backgroundColor = '#448AFF'
                clearTimeout()
            }, 3000)
        }
    }
}
</script>

<style scoped lang="scss">
#AppViewPopupLinkDisplay {
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
    .link-display {
        height: 50px;
        width: 100%;
        padding: 14px 20px 10px 45px;
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
        .copy-text {
            width: 0;
            height: 0;
            opacity: 0;
            visibility: hidden;
        }
        .btn {
            width: 100px;
            height: 40px;
            padding: 10px;
            margin: 0;
            background-color: $blue;
            color: #fff;
            border-radius: 6px;
            position: absolute;
            top: 5px;
            right: 5px;
            transition: all 0.2s ease;
            &:hover {
                background-color: darken($blue, 10%);
            }
        }
    }
}
</style>
