package pl.ap.finance.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
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
}
