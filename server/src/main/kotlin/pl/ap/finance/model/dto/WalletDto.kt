package pl.ap.finance.model.dto

import pl.ap.finance.model.Wallet
import java.util.*

class WalletDto(
    val name: String,
    val currency: Currency,
    val amount: Double
) {
    companion object {
        fun toWallet(walletDto: WalletDto): Wallet {
            return Wallet(
                    name = walletDto.name,
                    currency = walletDto.currency,
                    amount = walletDto.amount
            )
        }
    }
}