interface IWallet {
    id: number,
    name: string,
    currency: string,
    amount: number,
    isDefault: boolean,
    _wallet_id: number | null
}

export default IWallet