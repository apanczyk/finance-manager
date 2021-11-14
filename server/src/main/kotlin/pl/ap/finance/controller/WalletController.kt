package pl.ap.finance.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pl.ap.finance.model.Operation
import pl.ap.finance.repository.WalletRepository
import pl.ap.finance.service.UserService

@RestController
@RequestMapping("/api/wallets")
class WalletController(private val walletService: UserService, private val walletRepository: WalletRepository) {

    @GetMapping("/{id}/operations")
    fun getOperationsForWallet(@PathVariable("id") id: Long): ResponseEntity<MutableSet<Operation>>? {
        val wallet = walletRepository.findById(id)
        return ResponseEntity.ok(wallet.get().operations)
    }
}
