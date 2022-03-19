import { RequestAPI } from "./baseApi";

class UserService {
    static login = (data) => {
        return RequestAPI.post('/users/login', data)
    }

    static register = (data) => {
        return RequestAPI.post('/users/register', data)
    }

    static getUserInfo = (address) => {
        return RequestAPI.get(`/users/info?address=${address}`)
    }


    static getProfile = () => {
        return RequestAPI.get('/users/profile')
    }

    static setPersonalData = (data) => {
        return RequestAPI.put('/users/profile', data)
    }
}

export default UserService;