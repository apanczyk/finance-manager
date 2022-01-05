package pl.ap.finance.util

import pl.ap.finance.model.Category
import pl.ap.finance.model.CategoryType
import pl.ap.finance.model.Wallet
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
        const val CATEGORY_NAME = "Bills"
        const val WALLET_ID = 1L

        val CATEGORY = Category(
            id = WALLET_ID,
            name = CATEGORY_NAME,
            type = CategoryType.COST
        )

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
            category = CATEGORY,
            walletId = WALLET_ID
        )

//        val WALLET_BODY = Wallet(
//            name = "Wallet 1",
//            currency = Currency.getInstance("PLN"),
//            amount = 100.0,
//            isDefault = false,
//            operations = OPERATION,
//            users =
//
//        )
    }
}
