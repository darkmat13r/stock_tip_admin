import baseService from "./baseService";

let path = 'support/chats'
let service = {
    getChats:() =>{
        return baseService.request(axios.get(path))
    },
    sendMessage :(userId, data)=>{
        let url = `${path}/${userId}/reply`
        return baseService.request(axios.post(url, data))
    },
    getMessages(userId){
        let url = `${path}/${userId}`
        return baseService.request(axios.get(url))
    }

}

export default service