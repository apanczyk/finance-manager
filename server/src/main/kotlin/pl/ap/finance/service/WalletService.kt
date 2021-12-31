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
import java.util.*

@Service
class WalletService(private val walletRepository: WalletRepository, private val categoryRepository: CategoryRepository) {

    fun addOperation(walletId: Long, operationDto: OperationDto): Wallet {
        val category = categoryRepository.findById(operationDto.category)
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

        val groupedOperation: List<GroupedOperation> = emptyList()
        operations.sortedBy { it.date }.filter { it.date > LocalDate.now().minusYears(1) }
        return groupedOperation
    }
}
