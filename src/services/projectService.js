import { RequestAPI } from "./baseApi";

class ProjectService {
    static allActive = () => {
        return RequestAPI.get('/projects')
    }

    static getAllForUser = () => {
        return RequestAPI.get('/projects/mine')
    }

    static create = (data) => {
        return RequestAPI.post('/projects', data)
    }

    static details = (id) => {
        return RequestAPI.get('/projects/' + id)
    }
}

export default UserService;