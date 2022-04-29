<template>
    <div class="GuestViewThumbnail">
        <div
            class="vsg-badge"
            title="Image is VSG official"
            v-show="img.vsgOfficial">
            <i class="fas fa-star"></i>
        </div>
        <div class="btns-wrap">
            <a
                class="menu-btn download-btn"
                :href="thumbnailPath"
                :download="
                    img.up +
                    '-' +
                    img.course +
                    '-' +
                    img.tags.join('-') +
                    '.svg'
                ">
                <i class="fas fa-download"></i>
            </a>
        </div>
        <img
            class="to-update"
            :src="thumbnailPath || imgPlaceholder"
            :alt="img.title"
            loading="lazy" />
    </div>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
    name: 'GuestViewThumbnail',
    props: {
        img: {
            type: Object,
            required: true
        }
    },
    data() {
        return {}
    },
    computed: {
        thumbnailPath() {
            return window.location.origin + '/server/upload/' + this.img.url + '.svg'
            // return process.env.VUE_APP_UPLOAD_URL + this.img.url + '.svg'
        },
        imgPlaceholder() {
            return require(`@/assets/imgs/img.svg`)
        }
    },
    methods: {}
}
</script>

<style scoped lang="scss">
.GuestViewThumbnail {
    flex: 1 0 auto;
    width: 180px;
    height: 180px;
    padding: 10px;
    margin: 15px;
    background-color: #fff;
    border: 2px solid #fff;
    border-radius: 20px;
    outline: none;
    // box-shadow: $boxShadowLight;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &:before {
        content: '';
        width: 180px;
        height: 180px;
        border-radius: 20px;
        display: block;
        position: absolute;
    }
    .vsg-badge {
        color: gold;
        font-size: 16px;
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .btns-wrap {
        width: 60px;
        height: 60px;
        margin: auto;
        background-color: rgba(255, 255, 255, 0.9);
        border: 1px solid $borderGrey;
        border-radius: 14px;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        .download-btn {
            width: 40px;
            height: 40px;
            margin: 5px;
            background-color: $green;
            color: #fff;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            transition: $animateFast;
            &:hover {
                background-color: darken($green, 10%);
            }
        }
    }
    img {
        width: 180px;
        height: auto;
        max-height: 120px;
        object-fit: contain;
    }
}

.GuestViewThumbnail:hover {
    &:before {
        background-color: rgba(255, 255, 255, 0.9);
    }
    .btns-wrap {
        opacity: 1;
    }
}
</style>
