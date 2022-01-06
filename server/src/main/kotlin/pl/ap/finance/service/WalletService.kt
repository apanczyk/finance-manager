package pl.ap.finance.service

import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.PathVariable
import pl.ap.finance.exceptions.WalletNotFoundException
import pl.ap.finance.model.CategoryType
import pl.ap.finance.model.Operation
import pl.ap.finance.model.Wallet
import pl.ap.finance.model.dto.OperationDto
import pl.ap.finance.model.response.GroupedOperation
import pl.ap.finance.repository.CategoryRepository
import pl.ap.finance.repository.WalletRepository
import java.time.LocalDate

@Service
class WalletService(private val walletRepository: WalletRepository, private val categoryRepository: CategoryRepository) {

    fun addOperation(walletId: Long, operationDto: OperationDto): Wallet {
        val category = categoryRepository.findById(operationDto.category.id)
        val wallet = walletRepository.findById(walletId).orElseThrow {
            throw WalletNotFoundException("Wallet with id $walletId doesn't exist")
        }
        val operation = Operation(
            name = operationDto.name,
            amount = operationDto.amount,
            place = operationDto.place,
            category = category.orElseThrow()
        )
        wallet.addOperation(operation)
        walletRepository.save(wallet)
        return wallet
    }

    fun getWallets(@PathVariable("id") userId: Long): List<Wallet> {
        val wallets = walletRepository.findAll()
        return wallets
    }

    fun groupOperations(wallet: Wallet): List<GroupedOperation> {
        val operations = wallet.operations

        val groupedOperation = mutableListOf<GroupedOperation>()
        val monthsFromLastYear = createMonthList(MONTHS_IN_YEAR)
        val previousYear = LocalDate.now().minusMonths(MONTHS_IN_YEAR)

        for(month in 1..MONTHS_IN_YEAR) {
            val currentRotationDate = previousYear.plusMonths(month)
            operations.filter {
                it.date.isAfter(
                    LocalDate.of(currentRotationDate.year, currentRotationDate.monthValue, 1)
                ) && it.date.isBefore(
                    LocalDate.of(currentRotationDate.year, currentRotationDate.monthValue % 12 + 1, 1)
                ) && it.category.type == CategoryType.COST
            }.sumOf { it.amount }.let {
                groupedOperation.add(GroupedOperation(capitalize(monthsFromLastYear[(month-1).toInt()]), it.toInt()))
            }
        }

        return groupedOperation
    }

    fun createMonthList(months: Long): MutableList<String> {
        val groupedOperation = mutableListOf<String>()
        val previousYear = LocalDate.now().minusMonths(months)
        for(month in 1..months) {
            groupedOperation.add(previousYear.plusMonths(month).month.name)
        }
        return groupedOperation
    }

    companion object {
        const val MONTHS_IN_YEAR = 12L

        fun capitalize(word: String): String {
            return word.substring(0,1).uppercase() + word.substring(1).lowercase()
        }
    }
}
