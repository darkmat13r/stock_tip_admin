window._ = require('lodash');

require('bootstrap');
require('./config')
require('chart.js')
require('vue-chartjs')
import config from './config'
import auth from './services/auth'
import GlobalDirectives from './globalDirectives'
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
window.axios = require('axios');

window.toastr = require('./assets/vendor/toastr/toastr.min');
import ('./assets/vendor/toastr/toastr.min.css')
window.moment = require('moment');
toastr.options = {
    closeButton: !0,
    debug: !1,
    newestOnTop: !0,
    progressBar: !0,
    positionClass: "toast-top-right demo_rtl_class",
    preventDuplicates: !0,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    tapToDismiss: !1,
    closeHtml: '<div class="circle_progress"></div><span class="progress_count"></span> <i class="la la-close"></i> '
}

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from "laravel-echo"
window.io = require('socket.io-client');
// Have this in case you stop running your laravel echo server
if (typeof io !== 'undefined') {
    window.Echo = new Echo({
        broadcaster: 'socket.io',
        host: config.HOST + ':6004',
        forceTLS: false,
        auth: {
            headers: {
                authorization: auth.getToken()
            }
        }
    });
}

import './assets/css/chat.css'
import './assets/vendor/waves/waves.min.css'
//require('./assets/js/dashboard')
require('./assets/js/global')
require('./assets/js/scripts')
require('./assets/js/init')
require('./assets/js/jquery.slimscroll')
require('./assets/vendor/waves/waves.min')
import './assets/css/style.css'


axios.defaults.baseURL = config.API_URL;
axios.defaults.headers.common['Authorization'] = auth.getToken();
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//Styles
//import './assets/style/custom.scss'
export default{
    install(Vue){
        Vue.use(GlobalDirectives)
        Vue.prototype.$config = config
        Vue.prototype.$auth = auth
        Vue.filter('not_defined', function(value){
            if(!value)  return  'No data'
            return value
        })
        Vue.filter('capitalize', function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        })
        Vue.filter('timeAgo', function (value) {
            if (!value) return ''
            value = value.toString()
            return moment(value, 'YYYY-MM-DD HH:mm:ss').fromNow()
        })
        Vue.filter('replaceUnderscore', function(value){
            if(!value) return ''
            value = value.toString()
            return value.replace(/_/g, ' ');
        })
    }
}
