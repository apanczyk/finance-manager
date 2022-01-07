import Operation from "../../model/Operation";
import authHeader from "../AuthHeader";
import api from "./api";

class DataService {
    getAll() {
        return api.get(`/api/operations`, { headers: authHeader() })
    }

    create(data: Operation) {
        return api.post(`/api/operations`, data, { headers: authHeader() })
    }

    update(data: Operation) {
        return api.post(`/api/operations/${data.id}`, data, { headers: authHeader() })
    }

    delete(id: string) {
        return api.delete(`/api/operations/${id}`, { headers: authHeader() })
    }

    getWallets(id: string) {
        return api.get(`/api/user/${id}/wallets`, { headers: authHeader() })
    }

    getOperations(id: string) {
        return api.get(`/api/wallets/${id}/operations`, { headers: authHeader() })
    }

    getCategories(type: string) {
        return api.get(`/api/categories/${type}`, { headers: authHeader() })
    }

    getCategoriesAll() {
        return api.get(`/api/categories`, { headers: authHeader() })
    }

    getGroupedOperations(id: string) {
        return api.get(`/api/wallets/${id}/grouped`, { headers: authHeader() })
    }
}
export default new DataService();
