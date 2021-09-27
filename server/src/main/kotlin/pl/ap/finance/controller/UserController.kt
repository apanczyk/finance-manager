package pl.ap.finance.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pl.ap.finance.model.User
import pl.ap.finance.security.UserService

@RestController
@RequestMapping("/api")
class UserController(private val userService: UserService) {

    @PostMapping("/register")
    fun registerUser(@RequestBody newUser: User): ResponseEntity<User> {
        val user = userService.registerUser(
            User(
                firstName = newUser.firstName,
                lastName = newUser.lastName,
                email = newUser.email,
                password = newUser.password
            )
        )
        return ResponseEntity(user, HttpStatus.CREATED)
    }
}
