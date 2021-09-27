package pl.ap.finance.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pl.ap.finance.model.User
import pl.ap.finance.model.dto.UserDto
import pl.ap.finance.model.dto.WalletDto
import pl.ap.finance.service.UserService

@RestController
@RequestMapping("/api")
class UserController(private val userService: UserService) {

    @PostMapping("/register")
    fun registerUser(@RequestBody newUser: UserDto): ResponseEntity<User> {
        val user = userService.registerUser(newUser)
        return ResponseEntity(user, HttpStatus.CREATED)
    }

    @PostMapping("/user/{id}")
    fun addWallet(@PathVariable("id") userId: Long,
                  @RequestBody request: WalletDto): ResponseEntity<User> {
        val modifiedUser = userService.addWallet(userId, request)
        return ResponseEntity(modifiedUser, HttpStatus.OK)
    }
}
