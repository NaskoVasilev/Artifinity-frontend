import { RequestAPI } from "./baseApi";

class UserService {
    static login = (data) => {
        return RequestAPI.post('/users/login', data)
    }

    static register = (data) => {
        return RequestAPI.post('/users/register')
    }

    static getProfile = () => {
        return RequestAPI.get('/users/profile')
    }

    static setPersonalData = () => {
        return RequestAPI.put('/users/profile')
    }
}

export default UserService;