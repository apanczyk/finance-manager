package pl.ap.finance.model.dto

import pl.ap.finance.model.Wallet
import java.util.*

class WalletDto(
    val id: Long = 0,
    val name: String,
    val currency: Currency,
    val amount: Double,
    val isDefault: Boolean
) {
    companion object {
        fun toWallet(walletDto: WalletDto): Wallet {
            return Wallet(
                    name = walletDto.name,
                    currency = walletDto.currency,
                    amount = walletDto.amount,
                    isDefault = walletDto.isDefault
            )
        }
    }
}
