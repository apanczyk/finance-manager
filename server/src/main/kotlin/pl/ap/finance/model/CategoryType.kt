package pl.ap.finance.model

import pl.ap.finance.exceptions.CategoryTypeNotFoundException

enum class CategoryType {
    INCOME, OUTCOME;

    companion object {
        fun categoryTypeOf(categoryType: String): CategoryType {
            return when (categoryType) {
                "INCOME" -> INCOME
                "OUTCOME" -> OUTCOME
                else -> throw CategoryTypeNotFoundException()
            }
        }
    }
}