package pl.ap.finance.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pl.ap.finance.model.Operation
import pl.ap.finance.model.Wallet
import pl.ap.finance.model.dto.WalletDto
import pl.ap.finance.model.response.GroupedOperation
import pl.ap.finance.repository.UserRepository
import pl.ap.finance.repository.WalletRepository
import pl.ap.finance.service.WalletService
import java.util.*
import kotlin.NoSuchElementException

@RestController
@RequestMapping("/api/wallets")
class WalletController(
    private val walletService: WalletService,
    private val walletRepository: WalletRepository,
    private val userRepository: UserRepository
    ) {

    @GetMapping("/{id}/operations")
    fun getOperationsForWallet(@PathVariable("id") id: Long): ResponseEntity<MutableSet<Operation>>? {
        val wallet = walletRepository.findById(id).orElseThrow {
            throw NoSuchElementException("No operations for this wallet")
        }
        return ResponseEntity.ok(wallet.operations)
    }

    @GetMapping("/{id}/grouped")
    fun getGroupedOperations(@PathVariable("id") id: Long): ResponseEntity<List<GroupedOperation>> {
        val wallet = walletRepository.findById(id)
        val groupedOperations = walletService.groupOperations(wallet.get())
        return ResponseEntity.ok(groupedOperations)
    }

    @GetMapping("/{id}")
    fun getNewWalletForUser(@PathVariable("id") id: Long) : ResponseEntity<Wallet> {
        val user = userRepository.findById(id).get()
        val newWallet = Wallet(
            name = "Wallet ${user.wallets.size + 1}",
            currency = Currency.getInstance("PLN"),
            amount = 0.0,
            isDefault = false
        )
        user.addWallet(newWallet)
        val createdWallet = walletRepository.save(newWallet)
        return ResponseEntity.ok(createdWallet)
    }

    @PostMapping("/{id}/update")
    fun updateWallets(@PathVariable("id") id: Long, @RequestBody request: List<WalletDto>) : ResponseEntity<List<Wallet>> {
        val allWallets = walletRepository.findAll()
            .filter { it.users.any { it.id == id } }
        val updateWallets = arrayListOf<Wallet>()

        request.forEach { wallet ->
            val walletsToModify = allWallets.first {
                it.id == wallet.id
            }.let {
                Wallet.walletOf(it, wallet)
            }
            updateWallets.add(walletsToModify)
        }

        val idToDelete = arrayListOf<Wallet>()
        allWallets.forEach{ wallet ->
            if(wallet.id !in updateWallets.map { it.id })
                idToDelete.add(wallet)
        }

        val deletedWallets = walletRepository.deleteAllById(idToDelete.map { it.id })
        val createdWallets = walletRepository.saveAll(updateWallets)
        return ResponseEntity.ok(createdWallets)
    }


}
