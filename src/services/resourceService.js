import baseService from "./baseService";
import axios from "axios";

const resourceService = {
    init(path) {
        return {
            getById(id){
                let url = `${path}/${id}`
                return baseService.request(axios.get(url))
            },
            get(url = path, paginate = true, params = null) {
                if (!url) {
                    url = path
                }
                if (params == null) {
                    params = {}
                }
                params.paginate = paginate ? 1 : 0
                return baseService.request(axios.get(url, {
                    'params': params
                }))
            },
            store(data) {
                return baseService.request(axios.post(path, data))
            },
            delete(id) {
                let url = `${path}/${id}`
                return baseService.request(axios.delete(url))
            },
            update(id, data) {
                let url = `${path}/${id}`
                return baseService.request(axios.put(url, data))
            }

        }
    }
}

export default resourceService
