import { ChangePasswordDto } from "../../model/ChangePassword";
import Operation from "../../model/Operation";
import IWallet from "../../model/types/WalletType";
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

    getGroupedOperations(id: string, diagramType: string) {
        return api.get(`/api/wallets/${id}/grouped/${diagramType}`, { headers: authHeader() })
    }

    getNewWalletForUser(id: string) {
        return api.get(`/api/wallets/${id}`, { headers: authHeader() })
    }

    updateWallets(id: string, walletList: IWallet[]) {
        return api.post(`/api/wallets/${id}/update`, walletList, { headers: authHeader() })
    }

    getAllUsers() {
        return api.get(`/api/user/all`, { headers: authHeader() })
    }

    changePassword(changePasswordDto: ChangePasswordDto) {
        return api.post(`/api/user/changePassword`, changePasswordDto, { headers: authHeader() })
    }

    deleteUser(id: string) {
        return api.delete(`/api/user/${id}`, { headers: authHeader() })
    }

    getMonthDiagram(id: string, month: string) {
        return api.get(`/api/wallets/${id}/month/${month}`, { headers: authHeader() })
    }

    getGeneral(id: string) {
        return api.get(`/api/wallets/${id}/general`, { headers: authHeader() })
    }

    getCurrencyTable(id: string) {
        return api.get(`/api/wallets/${id}/currency`, { headers: authHeader() })
    }

}
export default new DataService();
