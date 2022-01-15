package pl.ap.finance.model.response

data class GroupedGeneral(
    val month: String,
    val total: Int,
    val change: Int
)