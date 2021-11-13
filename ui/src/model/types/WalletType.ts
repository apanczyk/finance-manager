interface IWallet {
    id: number,
    name: string,
    currency: string,
    amount: number,
    isDefault: boolean
}

export default IWallet