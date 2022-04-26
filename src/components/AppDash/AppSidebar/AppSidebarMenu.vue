<template>
    <div id="AppSidebarMenu">
        <AppSidebarMenuUnies />
        <AppSidebarMenuAdmin />
        <AppSidebarMenuSharing />
        <AppSidebarMenuSession />
    </div>
</template>

<script>
import AppSidebarMenuUnies from './AppSidebarMenuUnies'
import AppSidebarMenuAdmin from './AppSidebarMenuAdmin'
import AppSidebarMenuSharing from './AppSidebarMenuSharing'
import AppSidebarMenuSession from './AppSidebarMenuSession'

export default {
    name: 'AppSidebarMenu',
    components: {
        AppSidebarMenuUnies,
        AppSidebarMenuAdmin,
        AppSidebarMenuSharing,
        AppSidebarMenuSession
    }
}
</script>

<style lang="scss">
#AppSidebarMenu {
    padding-top: 30px;
    h5 {
        padding: 0 30px;
        margin: 30px 0 10px 0;
        font-size: 14px;
        font-weight: normal;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.4);
    }
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
        li {
            a {
                padding: 11px 27px;
                color: rgba(255, 255, 255, 0.8);
                font-size: 16px;
                font-weight: 500;
                text-decoration: none;
                display: block;
                i {
                    width: 15px;
                    margin-right: 10px;
                    text-align: center;
                }
                &:hover {
                    padding-left: 24px;
                    background-color: lighten($navy, 3%);
                    color: rgba(255, 255, 255, 1);
                    border-left: 3px solid $green;
                }
            }
        }
    }
}
</style>
