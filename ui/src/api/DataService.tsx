import Operation from "../model/Operation";
import authHeader from "../service/auth.header";
import api from "./api";

class DataService {
    getAll() {
        return api.get(`/api/operations`, { headers: authHeader() })
    }

    create(data: Operation) {
        return api.post(`/api/operations`, data, { headers: authHeader() } )
    }

    delete(id: string) {
        return api.delete(`/api/operations/${id}`, { headers: authHeader() })
    }
}
export default new DataService();
