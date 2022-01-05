import Category from "./Category";

export default interface Operation {
    id: string,
    name: string,
    amount: number,
    place: string,
    date: Date,
    category: Category,
    walletId: number
}