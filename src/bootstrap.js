window._ = require('lodash');

require('bootstrap');
require('./config')
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
window.axios = require('axios');

window.toastr = require('toastr');
window.moment = require('moment');
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300000",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

/*import Echo from "laravel-echo"
window.io = require('socket.io-client');
// Have this in case you stop running your laravel echo server
if (typeof io !== 'undefined') {
    window.Echo = new Echo({
        broadcaster: 'socket.io',
        host: window.location.hostname + ':6001',
        forceTLS: false,
        auth: {
            headers: {
                authorization: 'Bearer '+auth.getToken()
            }
        }
    });
}*/

import './assets/css/style.css'
import './assets/css/chat.css'
import './assets/vendor/waves/waves.min.css'
//require('./assets/js/dashboard')
require('./assets/js/global')
require('./assets/js/scripts')
require('./assets/vendor/waves/waves.min')
import config from './config'
import auth from './services/auth'
import GlobalDirectives from './globalDirectives'
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
