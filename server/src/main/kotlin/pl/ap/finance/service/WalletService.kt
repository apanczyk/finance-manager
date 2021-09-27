package pl.ap.finance.service

import org.springframework.stereotype.Service
import pl.ap.finance.exceptions.WalletNotFoundException
import pl.ap.finance.model.Operation
import pl.ap.finance.model.Wallet
import pl.ap.finance.model.dto.OperationDto
import pl.ap.finance.repository.WalletRepository

@Service
class WalletService(private val walletRepository: WalletRepository) {

    fun addOperation(walletId: Long, operationDto: OperationDto): Wallet {
        val wallet = walletRepository.findById(walletId).orElseThrow {
            throw WalletNotFoundException("Wallet with id $walletId doesn't exist")
        }
        val operation = Operation(
                name = operationDto.name,
                amount = operationDto.amount,
                place = operationDto.place
        )
        wallet.addOperation(operation)
        walletRepository.save(wallet)
        return wallet
    }
}
