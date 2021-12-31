package pl.ap.finance.util

import pl.ap.finance.model.Category
import pl.ap.finance.model.dto.OperationDto
import pl.ap.finance.model.dto.UserDto
import pl.ap.finance.model.dto.WalletDto
import java.util.*

class TestData {

    companion object {
        const val FIRST_NAME = "Michael"
        const val LAST_NAME = "Tester"
        const val EMAIL = "test@test.com"
        const val PASSWORD = "password"

        val CURRENCY = Currency.getInstance("USD")!!
        const val NAME = "Wallet"
        const val AMOUNT = 200.0
        const val IS_DEFAULT = false

        const val PLACE = "Warsaw"
        const val CATEGORY =  1L


        val USER = UserDto(
                firstName = FIRST_NAME,
                lastName = LAST_NAME,
                email = EMAIL,
                password = PASSWORD
        )

        val WALLET = WalletDto(
                name = NAME,
                currency = CURRENCY,
                amount = AMOUNT,
                isDefault = IS_DEFAULT
        )

        val OPERATION = OperationDto(
                name = NAME,
                amount = AMOUNT,
                place = PLACE,
                category = CATEGORY
        )
    }
}
