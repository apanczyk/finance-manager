package pl.ap.finance.model.response

data class GroupedOperation(
    val month: String,
    val cost: Int,
    val income: Int
)