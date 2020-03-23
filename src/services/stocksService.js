import resourceService from "./resourceService";
import baseService from "./baseService";

const path = 'stocks'
let stockService = resourceService.init(path)
stockService.updateStatus = (id, status) => {
    let url = `${path}/${id}/status`
    return baseService.request(axios.put(url, {
        status: status
    }))
}
stockService.renew = (id, data) => {
    let url = `${path}/${id}/renew`
    return baseService.request(axios.put(url, data))
}
export default stockService