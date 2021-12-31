package pl.ap.finance.model.dto

class OperationDto(
        val name: String,
        val amount: Double,
        val place: String,
        val category: Long,
        val walletId: Long
)
