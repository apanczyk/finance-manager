package pl.ap.finance.model

import pl.ap.finance.exceptions.CategoryTypeNotFoundException

enum class CategoryType {
    INCOME, COST;

    companion object {
        fun categoryTypeOf(categoryType: String): CategoryType {
            return when (categoryType) {
                "INCOME" -> INCOME
                "COST" -> COST
                else -> throw CategoryTypeNotFoundException()
            }
        }
    }
}