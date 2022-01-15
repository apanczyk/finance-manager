package pl.ap.finance.model.response

import java.util.*


class NbpObject(
    val table: String,
    val currency: String,
    val code: String,
    val rates: ArrayList<Rate>,
)

class Rate (
    val no: String,
    val effectiveDate: String,
    val mid: Double
)