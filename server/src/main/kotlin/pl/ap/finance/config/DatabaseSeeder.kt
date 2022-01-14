package pl.ap.finance.config

import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component
import pl.ap.finance.model.Category
import pl.ap.finance.model.CategoryType
import pl.ap.finance.model.Role
import pl.ap.finance.model.dto.UserDto
import pl.ap.finance.repository.CategoryRepository
import pl.ap.finance.repository.UserRepository
import pl.ap.finance.service.UserService

@Component
class DatabaseSeeder(val userRepository: UserRepository,
                     val userService: UserService,
                     val categoryRepository: CategoryRepository) {

    @EventListener
    fun seed(event: ContextRefreshedEvent?) {
        seedUsersTable()
        seedCategoryTable()
    }

    private fun seedUsersTable() {
        if(userRepository.findAll().isEmpty()) {
            val users = listOf(
                UserDto(email = "arek.paniec@gmail.com", password = "123456", firstName = "Arkadiusz", lastName = "Pańczyk", role = Role.ADMIN.toString()),
                UserDto(email = "test@test.com", password = "123456", firstName = "Test", lastName = "Test"),
                UserDto(email = "empty@empty.com", password = "123456", firstName = "Empty", lastName = "Empty")
            )
            users.forEach { userService.registerUser(it) }
        }
    }

    private fun seedCategoryTable() {
        if(categoryRepository.findAll().isEmpty()) {
            val categories = listOf(
                Category(name = "Bills", type = CategoryType.COST),
                Category(name = "Food", type = CategoryType.COST),
                Category(name = "Transport", type = CategoryType.COST),
                Category(name = "Rent", type = CategoryType.COST),
                Category(name = "Hobby", type = CategoryType.COST),
                Category(name = "Health", type = CategoryType.COST),
                Category(name = "Loan", type = CategoryType.COST),
                Category(name = "Other", type = CategoryType.COST),
                Category(name = "Salary", type = CategoryType.INCOME),
                Category(name = "Indefinite income", type = CategoryType.INCOME),
                Category(name = "Additional activity", type = CategoryType.INCOME)
            )
            categoryRepository.saveAllAndFlush(categories)
        }
    }
}
