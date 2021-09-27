package pl.ap.finance.util

import pl.ap.finance.model.User
import pl.ap.finance.model.dto.WalletDto
import java.util.*

class TestData {

    companion object {
        const val FIRST_NAME = "Michael"
        const val LAST_NAME = "Tester"
        const val EMAIL = "test@test.com"
        const val PASSWORD = "password"

        val USER = User(
            firstName = FIRST_NAME,
            lastName = LAST_NAME,
            email = EMAIL,
            password = PASSWORD
        )

        val WALLET = WalletDto(
            name = "Wallet",
            currency = Currency.getInstance("USD"),
            amount = 200.0
        )
    }
}
