import { RequestAPI } from "./baseApi";

class ArtTypesService {
    static all = () => {
        return RequestAPI.get('/artTypes')
    }
}

export default ArtTypesService;