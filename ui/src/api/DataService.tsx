import Operation from "../model/Operation";
import api from "./api";

class DataService {
    getAll() {
        return api.get("/operations")
    }

    create(data: Operation) {
        return api.post("/operations", data)
    }
}
export default new DataService();
