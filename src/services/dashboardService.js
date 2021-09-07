import resourceService from "./resourceService";
import baseService from "./baseService";

const path = 'analytics'

const api = {
    getAnalytics(){
        return baseService.request(axios.get(path))
    },
    getRevenueReport(){
        return baseService.request(axios.get(`${path}/revenue`))
    }
}
export default api