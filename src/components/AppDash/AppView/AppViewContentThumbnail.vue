<template>
    <div class="AppViewContentThumbnail" @mouseleave="closeDropdown">
        <div
            class="vsg-badge"
            title="Image is VSG official"
            v-show="img.vsgOfficial">
            <i class="fas fa-star"></i>
        </div>
        <div class="btns-wrap">
            <div class="menu-btn" @click.self="toggleDropdown">
                <div class="label">•••</div>
                <div class="dropdown">
                    <div
                        class="dropdown-btn"
                        @click="this.$emit('toggleVSGOfficial', img)">
                        <i class="fas fa-star"></i>
                        <div>
                            {{ img.vsgOfficial ? 'Revoke' : 'Make' }} VSG
                            official
                        </div>
                    </div>
                    <div class="dropdown-btn" @click="firePopup('edit-tags')">
                        <i class="fas fa-edit"></i>
                        <div>Edit tags/keywords</div>
                    </div>
                    <hr />
                    <div
                        class="dropdown-btn delete-btn"
                        @click="$emit('deleteImage', img)">
                        <i class="fas fa-trash-alt"></i>
                        <div>Delete</div>
                    </div>
                </div>
            </div>
            <a
                class="menu-btn download-btn"
                :href="thumbnailPath"
                :download="img.tags.join('-') + '.svg'">
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
import { mapActions } from 'vuex'

export default {
    name: 'AppViewContentThumbnail',
    props: {
        img: {
            type: Object,
            required: true,
            default() {
                return {
                    id: Math.floor(Math.random() * 1000),
                    up: '',
                    course: '',
                    tags: [],
                    url: 'img',
                    vsgOfficial: false
                }
            }
        }
    },
    data() {
        return {}
    },
    computed: {
        thumbnailPath() {
            return require(`@/../upload/${this.img.url}.svg`)
        },
        imgPlaceholder() {
            return require(`@/assets/imgs/img.svg`)
        }
    },
    methods: {
        ...mapActions(['setPopup']),
        firePopup(type) {
            this.setPopup({ isActive: true, type: type })
        },
        toggleDropdown() {
            const element = event.target
            const dropdown = element.querySelector('.dropdown')
            dropdown.classList.toggle('show')
        },
        closeDropdown() {
            const element = event.target
            const dropdown = element.querySelector('.dropdown')
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show')
            }
        }
    }
}
</script>

<style scoped lang="scss">
.AppViewContentThumbnail {
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
        width: 110px;
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
        .menu-btn {
            width: 40px;
            height: 40px;
            margin: 5px;
            background-color: darken($backgroundGrey, 5%);
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: $animateFast;
            .label {
                pointer-events: none;
            }
            &:hover {
                background-color: darken($backgroundGrey, 15%);
            }
            .dropdown {
                width: 250px;
                padding: 10px 0;
                background-color: #fff;
                border: 1px solid #ddd;
                border-radius: 14px;
                display: none;
                position: absolute;
                top: calc(100% + 5px);
                left: 0;
                z-index: 1;
                &.show {
                    display: block;
                }
                .dropdown-btn {
                    width: 100%;
                    padding: 10px 16px;
                    color: $black;
                    font-size: 16px;
                    display: flex;
                    cursor: pointer;
                    &:hover {
                        background-color: $backgroundGrey;
                    }
                    i {
                        margin-right: 10px;
                    }
                }
                .delete-btn {
                    width: calc(100% - 20px);
                    margin: 0 10px;
                    background-color: $red;
                    border-radius: 8px;
                    color: #fff;
                    transition: $animateFast;
                    i,
                    div {
                        pointer-events: none;
                    }
                    &:hover {
                        background-color: darken($red, 10%);
                    }
                }
                hr {
                    margin: 10px 0;
                    border-top: none;
                    border-left: none;
                    border-right: none;
                }
            }
        }
        .download-btn {
            background-color: $green;
            color: #fff;
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

.AppViewContentThumbnail:hover {
    &:before {
        background-color: rgba(255, 255, 255, 0.9);
    }
    .btns-wrap {
        opacity: 1;
    }
}
</style>
