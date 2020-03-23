// URL and endpoint constants
import axios from 'axios'
import baseService from "./baseService";

const LOGIN_URL = 'login'
const SIGNUP_URL = 'register'
const EMAIL_RESEND_URL = 'email/resend'
const VERIFICATION_URL = 'account/check/verification'
const TEST_URL = 'test'
const KEY_USER = 'tournament_user'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"

let authChangeListeners = []
const auth = {
    // User object will let us check authentication status
    user: {
        authenticated: false
    },
    init(){
      this.notifyAuthChanged()
    },
    addAuthChangeListener(listener) {
        authChangeListeners.push(listener)
    },

    removeAllListeners() {
        authChangeListeners.splice(0, authChangeListeners.length)
    },

    notifyAuthChanged() {
        authChangeListeners.forEach((listener) => {
            listener(this.getCurrentUser())
        })
    },
    saveUser(user){
        localStorage.setItem(KEY_USER, JSON.stringify(user))
    },
    // Send a request to the login URL and save the returned JWT
    login(context, creds, redirect) {

        context.error = ""
        axios.post(LOGIN_URL, creds)
            .then((response) => {
                context.isLoading = false
                let data = response.data
                if (data.error) {
                    context.error = data.message
                    toastr.error(data.message)
                } else {
                    const user = data.result
                    this.saveUser(user)
                    setTimeout(()=>{
                        this.notifyAuthChanged()
                        context.$router.push(redirect)
                    }, 200)

                }
            })
            .catch(function (error) {
                context.error = 'Couldn\'t fulfil the request at this moment. Please try again'
                console.log(error)
                context.isLoading = false
                toastr.error('Couldn\'t fulfil the request at this moment. Please try again')
            });

    },

    signup(context, creds, redirect) {
        axios.post(SIGNUP_URL, creds)
            .then((response) => {
                context.isLoading = false
                let data = response.data
                if (data.error) {
                    context.error = data.message
                    toastr.error(data.message)
                } else {
                    this.saveUser(data.result)
                    this.user.authenticated = true
                    context.$router.push(redirect)
                    setTimeout(()=>{
                        this.notifyAuthChanged()
                    }, 200)

                }

            })
            .catch(function (error) {
                context.isLoading = false
                context.error = 'Couldn\'t fulfil the request at this moment. Please try again'
                console.log(error)
                toastr.error('Couldn\'t fulfil the request at this moment. Please try again')
            });

    },

    // To log out, we just need to remove the token
    logout() {
        localStorage.removeItem(KEY_USER)
        this.user.authenticated = false
        this.notifyAuthChanged()
    },

    checkAuth() {
        var user = this.getCurrentUser()
        if (user) {
            return true
        }
        return false
    },

    // The object to be passed as a header for authenticated requests
    getAuthHeader() {
        return {
            'Authorization': this.getToken()
        }
    },
    getToken() {
        const user = this.getCurrentUser()
        if (user) {
            return 'Bearer ' + user.access_token
        }
        return 'Bearer '
    },

    getCurrentUser() {
        const userJson = localStorage.getItem(KEY_USER)
        return JSON.parse(userJson)
    },
    resendVerification() {
        return baseService.request(axios.get(EMAIL_RESEND_URL, {
            headers: this.getAuthHeader()
        }))
    },
    setVerified() {
        const user = this.getCurrentUser()
        if (user) {
            user.is_verified = true
            localStorage.setItem(KEY_USER, JSON.stringify(user))
        }
    },
    isVerified() {
        return baseService.request(axios.get(VERIFICATION_URL, {
            headers: this.getAuthHeader()
        }))
    },
    checkVerification() {
        return this.getCurrentUser() != null && this.getCurrentUser().is_verified !== undefined && this.getCurrentUser().is_verified
    }
}

export default auth;
