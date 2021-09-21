import Operation from "../model/Operation";
import api from "./api";

class DataService {
    getAll() {
        return api.get(`/api/operations`)
    }

    create(data: Operation) {
        return api.post(`/api/operations`, data)
    }

    delete(id: string) {
        return api.delete(`/api/operations/${id}`)
    }
}
export default new DataService();
