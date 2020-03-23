<template>
    <div class="header dashboard">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12">
                    <nav class="navbar navbar-expand-lg navbar-light px-0 justify-content-between">
                        <a class="navbar-brand" href="index.html"><img src="images/logo.png" alt=""></a>

                        <div class="dashboard_log my-2">
                            <div class="d-flex align-items-center">
                               <!-- <div class="account_money">
                                    <ul>
                                        <li class="crypto">
                                            <span>0.0025</span>
                                            <i class="cc BTC"></i>
                                        </li>
                                        <li class="usd">
                                            <span>19.93 USD</span>
                                        </li>
                                    </ul>
                                </div>-->

                                <dropdown dropdown-class="profile_log">

                                    <div>
                                        <span class="thumb"><i class="la la-user"></i></span>
                                        <span class="name">{{this.$auth.getCurrentUser().name}}</span>
                                        <span class="arrow"><i class="la la-angle-down"></i></span>
                                    </div>
                                    <template v-slot:dropdown-menu>
                                        <a href="accounts.html" class="dropdown-item">
                                            <i class="la la-user"></i> Account
                                        </a>
                                        <a href="history.html" class="dropdown-item">
                                            <i class="la la-book"></i> History
                                        </a>
                                        <a href="settings.html" class="dropdown-item">
                                            <i class="la la-cog"></i> Setting
                                        </a>
                                        <a href="lock.html" class="dropdown-item">
                                            <i class="la la-lock"></i> Lock
                                        </a>
                                        <a @click="logout()" class="dropdown-item logout">
                                            <i class="la la-sign-out"></i> Logout
                                        </a>
                                    </template>
                            </dropdown>
                        </div>
                </div>
                </nav>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import Dropdown from "../common/Dropdown";

    export default {
        name: "Header",
        components: {Dropdown},
        methods:{
            logout(){
                this.$auth.logout()
            }
        }
    }
</script>

<style scoped>

</style>