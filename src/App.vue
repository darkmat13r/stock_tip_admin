<template>
    <div id="app">
        <div id="preloader">
            <div class="sk-three-bounce">
                <div class="sk-child sk-bounce1"></div>
                <div class="sk-child sk-bounce2"></div>
                <div class="sk-child sk-bounce3"></div>
            </div>
        </div>
        <div v-if="!checkLogin()" class="full-height">
            <router-view/>
        </div>
        <div v-else>
            <div id="main-wrapper" class="show">
                <Header/>
                <Sidebar/>

                <div class="row justify-content-center">
                    <div class="col-md-12 col-lg-10">
                        <Title/>
                    </div>
                </div>
                <div class="home">
                    <div class="content-body">
                        <div class="container-fluid">
                            <div class="row justify-content-center">
                                <div class="col-md-12 col-lg-10">
                                    <router-view/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer/>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "./components/layout/Header";
    import Sidebar from "./components/layout/Sidebar";
    import Title from "./components/layout/Title";
    import Footer from "./components/layout/Footer";

    export default {
        components: {Footer, Title, Sidebar, Header},
        watch: {
            /* "$route"(to, from) {
                 this.checkRedirect()
                this.checkRoles()
             }*/

        },
        mounted() {
            this.$auth.init()
            this.$auth.addAuthChangeListener((user) => {
                if (this.isAuthRoute() && user) {
                    this.$router.push('/')
                }
                if (!user) {
                    this.$router.push('/login')
                }
            })
            this.checkRedirect()

            /*let app = this
            this.$auth.onAuthStateChanged(function (user) {
                if (user) {
                } else {
                    app.$router.push('login')
                }
            });*/

        },
        destroyed() {
            this.$auth.removeAllListeners()
        },
        methods: {
            checkRoles() {
                /* let pages = []
                 pages.forEach(path => {
                     if (this.$route.path === path && this.$hasRole('viewer')) {
                         this.$router.push('/unauthorized')
                     }
                 })*/
            },
            isAuthRoute() {
                return this.$route.path === '/login'
                    || this.$route.path === '/register'
                    || this.$route.path === '/password/reset/email'
            },
            isVerifyRoute() {
                return this.$route.path === '/verify-email'
                    && this.$route.path === '/verify'
            },
            checkRedirect() {
                this.checkRoles()
                if (!this.$auth.checkAuth() && !this.isAuthRoute()) {
                    if (this.$route.query.verifyURL !== null) {
                        this.$router.push({
                            name: 'Login',
                            params: this.$route.query
                        })
                    }
                    this.$router.push('login')
                    return
                }
                if (this.$auth.checkAuth() && this.isAuthRoute()) {
                    this.$router.push('/')
                    return
                }
                if (this.$auth.checkAuth() && !this.isAuthRoute()) {
                    this.$auth.isVerified().then(res => {
                        if (this.isVerifyRoute()) {
                            this.$router.push('/')
                        }
                        this.$auth.setVerified()
                    }).catch(err => {

                    })
                    if (!this.$auth.checkVerification()) {
                        this.$router.push('/verify')
                        return
                    }
                }
                if (this.$route.path === '/verify-email') {
                    return;
                }
            },
            checkLogin() {
                return this.$auth.checkAuth()
            }
        }


    }
</script>
<style lang="scss">
.mini-logo{
    img{
        width: auto;
        height: 38px;
    }
}
</style>
