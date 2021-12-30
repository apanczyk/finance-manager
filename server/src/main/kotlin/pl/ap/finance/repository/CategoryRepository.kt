package pl.ap.finance.repository

import org.springframework.data.jpa.repository.JpaRepository
import pl.ap.finance.model.Category
import pl.ap.finance.model.CategoryType

interface CategoryRepository : JpaRepository<Category, Long> {
    fun findAllByType(type: CategoryType): List<Category>
}