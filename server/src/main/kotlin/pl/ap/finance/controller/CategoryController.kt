package pl.ap.finance.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pl.ap.finance.model.Category
import pl.ap.finance.model.CategoryType
import pl.ap.finance.repository.CategoryRepository

@RestController
@RequestMapping("/api/categories")
class CategoryController(val categoryRepository: CategoryRepository) {

    @GetMapping("/{type}")
    fun getAllCategoriesByType(@PathVariable("type") type: CategoryType): ResponseEntity<List<Category>> {
        val categories = categoryRepository.findAllByType(type)
        return ResponseEntity.ok(categories)
    }

    @GetMapping()
    fun getAllCategories(): ResponseEntity<List<Category>> {
        val categories = categoryRepository.findAll()
        return ResponseEntity.ok(categories)
    }
}