import resourceService from "./resourceService";
import baseService from "./baseService";
let path = 'users'
const service = resourceService.init(path)
service.sendMail = (userId, data)=>{
    let url  = `${path}/${userId}/send/mail`
    return baseService.request(axios.post(url,data))
}
service.sendNotification = (userId, data)=>{
    let url  = `${path}/${userId}/send/notification`
    return baseService.request(axios.post(url, data))
}
export default  service