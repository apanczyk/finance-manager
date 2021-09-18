import Operation from "../model/Operation";
import api from "./api";

class DataService {
    getAll() {
        return api.get(`/operations`)
    }

    create(data: Operation) {
        return api.post(`/operations`, data)
    }

    delete(id: string) {
        return api.delete(`/operations/${id}`)
    }
}
export default new DataService();
