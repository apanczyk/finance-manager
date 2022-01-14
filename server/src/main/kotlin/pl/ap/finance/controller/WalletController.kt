package pl.ap.finance.controller

import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pl.ap.finance.exceptions.MaxWalletSize
import pl.ap.finance.model.Operation
import pl.ap.finance.model.Wallet
import pl.ap.finance.model.dto.ReturnOperationDto
import pl.ap.finance.model.dto.WalletDto
import pl.ap.finance.model.response.GroupedOperation
import pl.ap.finance.model.response.MonthDiagram
import pl.ap.finance.repository.UserRepository
import pl.ap.finance.repository.WalletRepository
import pl.ap.finance.service.WalletService
import java.util.*

@RestController
@RequestMapping("/api/wallets")
class WalletController(
    @Value("\${finance.maxWallets}") private val maxWallets: Int,
    private val walletService: WalletService,
    private val walletRepository: WalletRepository,
    private val userRepository: UserRepository
    ) {

    @GetMapping("/{id}/operations")
    fun getOperationsForWallet(@PathVariable("id") id: Long): ResponseEntity<MutableSet<ReturnOperationDto>>? {
        val wallet = try {
                walletRepository.findById(id).get()
            } catch (e: Exception) {
                return ResponseEntity.ok(mutableSetOf())
            }

        return ResponseEntity.ok(wallet.operations.map {
            ReturnOperationDto.toReturnOperationDto(it)
        }.toMutableSet())
    }

    @GetMapping("/{id}/month/{month}")
    fun getMonthDiagram(@PathVariable("id") id: Long,
                             @PathVariable("month") month: String): ResponseEntity<List<MonthDiagram>> {
        val wallet = walletRepository.findById(id)
        val groupedOperations = walletService.monthDiagram(wallet.get(), month)
        return ResponseEntity.ok(groupedOperations)
    }

    @GetMapping("/{id}/grouped/{diagramType}")
    fun getGroupedOperations(
        @PathVariable("id") id: Long,
        @PathVariable("diagramType") diagramType: String): ResponseEntity<List<GroupedOperation>> {

        val wallet = walletRepository.findById(id)
        val groupedOperations = walletService.groupOperations(wallet.get(), diagramType)
        return ResponseEntity.ok(groupedOperations)
    }

    @GetMapping("/{id}")
    fun getNewWalletForUser(@PathVariable("id") id: Long) : ResponseEntity<Wallet> {
        val user = userRepository.findById(id).orElse(null)
        if(user.wallets.size >= maxWallets)
            throw MaxWalletSize("The number of wallets has been exceeded")
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

        walletRepository.deleteAllById(idToDelete.map { it.id })
        val createdWallets = walletRepository.saveAll(updateWallets)
        return ResponseEntity.ok(createdWallets)
    }


}
