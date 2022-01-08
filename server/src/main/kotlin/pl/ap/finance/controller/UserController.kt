package pl.ap.finance.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pl.ap.finance.model.User
import pl.ap.finance.model.Wallet
import pl.ap.finance.model.dto.WalletDto
import pl.ap.finance.repository.UserRepository
import pl.ap.finance.service.UserService

@RestController
@RequestMapping("/api")
class UserController(private val userService: UserService, private val userRepository: UserRepository) {

    @PostMapping("/user/{id}")
    fun addWallet(@PathVariable("id") userId: Long,
                  @RequestBody request: WalletDto): ResponseEntity<User> {
        val modifiedUser = userService.addWallet(userId, request)
        return ResponseEntity(modifiedUser, HttpStatus.OK)
    }

    @GetMapping("/user/{id}/wallets")
    fun getWallets(@PathVariable("id") userId: Long): ResponseEntity<Set<Wallet>> {
        val user = userRepository.getById(userId)
        return ResponseEntity(user.wallets, HttpStatus.OK)
    }

    @DeleteMapping("/user/{id}")
    fun removeUser(@PathVariable("id") userId: Long): ResponseEntity<User> {
        val user = userService.removeUser(userId)

        return ResponseEntity(user, HttpStatus.OK)
    }
}
