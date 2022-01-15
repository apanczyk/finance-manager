package pl.ap.finance.model.response

import java.math.BigDecimal

data class CurrencyTable(
    val currency: String,
    val amount: String
)