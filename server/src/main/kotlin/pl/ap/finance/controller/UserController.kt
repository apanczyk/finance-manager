package pl.ap.finance.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import pl.ap.finance.model.User
import pl.ap.finance.model.Wallet
import pl.ap.finance.model.dto.ChangePasswordDto
import pl.ap.finance.model.dto.WalletDto
import pl.ap.finance.repository.UserRepository
import pl.ap.finance.service.UserService

@RestController
@RequestMapping("/api/user")
class UserController(private val userService: UserService, private val userRepository: UserRepository) {

    @PostMapping("/{id}")
    fun addWallet(@PathVariable("id") userId: Long,
                  @RequestBody request: WalletDto): ResponseEntity<User> {
        val modifiedUser = userService.addWallet(userId, request)
        return ResponseEntity(modifiedUser, HttpStatus.OK)
    }

    @GetMapping("/{id}/wallets")
    fun getWallets(@PathVariable("id") userId: Long): ResponseEntity<Set<Wallet>> {
        val user = userRepository.getById(userId)
        return ResponseEntity(user.wallets, HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun removeUser(@PathVariable("id") userId: Long): ResponseEntity<List<User>> {
        userService.removeUser(userId)
        val users = userRepository.findAll()

        return ResponseEntity(users, HttpStatus.OK)
    }

    @PostMapping("/changePassword")
    fun changePassword(@RequestBody changePasswordDto: ChangePasswordDto): ResponseEntity<List<User>> {
        val user = userService.changePassword(changePasswordDto)
        return ResponseEntity(user, HttpStatus.OK)
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    fun getAllUsers(): ResponseEntity<List<User>> {
        val users = userRepository.findAll()

        return ResponseEntity(users, HttpStatus.OK)
    }
}
