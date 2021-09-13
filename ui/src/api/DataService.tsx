import api from "./api";

class DataService {
    getAll() {
        return api.get("/operations")
    }
}
export default new DataService();
