import auth from './auth'
import axios from 'axios'
const baseService = {
    request(axiosRequest, multipart = false) {
        axios.defaults.headers.common['Authorization'] = auth.getToken()
        if(multipart){
            axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
        }
        return new Promise((resolve, reject) => {
            axiosRequest.then(res => {
                let data = res.data
                if (data.error) {
                    toastr.error('Error', data.message)
                    reject(data.message)
                } else {
                    resolve(data.result)
                }
            }).catch(err => {
                if(err.response && err.response.status  !== undefined){
                    if (err.response.status === 401) {
                        auth.logout()
                    }
                    if (err.response.status === 403) {
                        toastr.error('Error','You don\'t have permission to access this resource')
                    }
                }
                reject(err.response)
            })
        })
    },

}
export default baseService
