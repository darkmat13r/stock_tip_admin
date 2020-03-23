<template>
    <div>

        <div class="authincation section-padding">
            <div class="container h-100">
                <div class="row justify-content-center h-100 align-items-center">
                    <div class="col-xl-5 col-md-6">
                        <div class="mini-logo text-center my-5">
                            <img src="../../assets/images/logo.png" alt="">
                        </div>
                        <div class="auth-form card">
                            <div class="card-header justify-content-center">
                                <h4 class="card-title">Sign in</h4>
                            </div>
                            <div class="card-body">
                                <form method="post" name="myform" @submit.prevent="login" class="signin_validate">
                                    <p class="text-danger" v-if="error">{{error}}</p>
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input id="email" type="email"
                                               placeholder="Eg name@website.com"
                                               class="form-control"
                                               v-model="form.email"
                                               name="email" required autocomplete="email" autofocus>
                                    </div>
                                    <div class="form-group">
                                        <label>Password</label>
                                        <input id="password" type="password"
                                               class="form-control form-control-appended" name="password" required
                                               placeholder="Enter Your Password"
                                               v-model="form.password"
                                               :type="showPassword ?  'text' : 'password'"
                                               autocomplete="current-password">
                                    </div>
                                    <div class="text-center">
                                        <loading-button btn-text="Sign in" :is-loading="isLoading"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LoadingButton from "../../components/common/LoadingButton";

    export default {
        name: "Login",
        components: {LoadingButton},
        data() {
            return {
                form: {
                    email: null,
                    password: null,

                },
                userSaved: false,
                sending: false,
                lastUser: null,
                validations: {
                    form: {},
                },
                showPassword: false,
                error: '',
                isLoading: false

            }
        },

        methods: {
            login: function (e) {
                if (this.form.email && this.form.password) {
                    let redirect = '/'
                    if (this.$route.params.verifyURL !== undefined) {
                        redirect = '/verify-email?verifyURL=' + this.$route.params.verifyURL
                    }
                    this.isLoading = true
                    this.$auth.login(this, this.form, redirect)
                } else {
                    this.isLoading = false
                }
                e.preventDefault()
            },

            isPasswordShown() {
                if (this.showPassword) {
                    return 'fe-eye-off show-password'
                }
                return 'fe-eye'
            },
            togglePassword() {
                this.showPassword = !this.showPassword
            }

        },
        comments: {}
    }
</script>

<style scoped>

</style>