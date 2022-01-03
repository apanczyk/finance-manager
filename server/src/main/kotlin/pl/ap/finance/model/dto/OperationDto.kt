package pl.ap.finance.model.dto

import pl.ap.finance.model.Category

class OperationDto(
        val name: String,
        val amount: Double,
        val place: String,
        val category: Category,
        val walletId: Long
)
