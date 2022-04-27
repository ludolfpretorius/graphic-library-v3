<template>
    <div id="GuestNav">
        <div class="logo">
            <div class="logo1">
                <img src="@/assets/imgs/2ulogo.svg" alt="CS logo" />
            </div>
            <div class="separator"></div>
            <div class="logo2">
                <img src="@/assets/imgs/cslogo.svg" alt="CS logo" />
                <h3>Graphic Library</h3>
            </div>
        </div>
        <div class="search">
            <span class="assets-amount">
                {{ filteredGuestImages.length }} images
            </span>
            <AppViewSearchInput
                :search="'keyword'"
                @updateFilter="filterImages" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppViewSearchInput from '@/components/AppDash/AppView/AppViewSearchInput'

export default {
    name: 'GuestNav',
    components: {
        AppViewSearchInput
    },
    computed: mapGetters(['allGuestImages', 'filteredGuestImages']),
    methods: {
        ...mapActions(['setFilteredGuestImages']),
        filterImages(dataObj) {
            const regex = new RegExp(dataObj.value, 'ig')
            const imgs = this.allGuestImages.filter((img) => {
                const tags = img.tags.join(',')
                return tags.match(regex)
            })
            this.setFilteredGuestImages(imgs)
        }
    }
}
</script>

<style scoped lang="scss">
#GuestNav {
    height: 100px;
    width: 100%;
    padding: 0 40px;
    background-color: #fff;
    box-shadow: $boxShadowMid;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 40px;
    z-index: 1;
    .logo {
        margin-left: 10px;
        display: flex;
        align-items: center;
        .logo1 {
            img {
                width: 50px;
                height: auto;
            }
        }
        .separator {
            margin: -6px 7px 0;
            font-size: 30px;
            color: $borderGrey;
        }
        .logo2 {
            img {
                width: 190px;
                height: auto;
                display: block;
            }
            h3 {
                margin: 5px 0 0px;
                font-size: 17px;
                color: $black;
                // text-align: center;
            }
        }
    }
    .search {
        display: flex;
        align-items: center;
        .assets-amount {
            margin-right: 20px;
        }
    }
}
</style>
