package pl.ap.finance.service

import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.PathVariable
import pl.ap.finance.exceptions.WalletNotFoundException
import pl.ap.finance.model.Operation
import pl.ap.finance.model.Wallet
import pl.ap.finance.model.dto.OperationDto
import pl.ap.finance.model.response.GroupedOperation
import pl.ap.finance.repository.CategoryRepository
import pl.ap.finance.repository.WalletRepository
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.*

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
        val months = 12L
        val operations = wallet.operations

        val groupedOperation = mutableListOf<GroupedOperation>()
        val monthsFromLastYear = createMonthList(months)
        val previousYear = LocalDate.now().minusMonths(months)

        for(month in 1..months) {
            val currentDate = previousYear.plusMonths(month)
            val xd = operations.filter {
                it.date.isAfter(LocalDate.of(currentDate.year, currentDate.monthValue, 0))
                        && it.date.isBefore(LocalDate.of(currentDate.year, currentDate.monthValue+1, 0))
            }.sumOf { it.amount }
            groupedOperation.add(GroupedOperation(monthsFromLastYear[month.minus(1).toInt()], xd.toInt()))
        }

        println(groupedOperation)
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
}
