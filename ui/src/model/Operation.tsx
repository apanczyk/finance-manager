import Category from "./Category";

export default interface Operation {
    id: string,
    name: string,
    amount: number,
    place: string,
    date: string,
    category: Category,
    categoryName: string,
    categoryType: string,
    walletId: number
}