package pl.ap.finance.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pl.ap.finance.model.User
import pl.ap.finance.model.dto.UserDto
import pl.ap.finance.model.requests.AuthRequest
import pl.ap.finance.model.response.JwtResponse
import pl.ap.finance.service.UserService

@RestController
@RequestMapping("/api")
class AuthController(private val userService: UserService) {

    @PostMapping("/auth/register")
    fun registerUser(@RequestBody newUser: UserDto): ResponseEntity<User> {
        val user = userService.registerUser(newUser)
        return ResponseEntity(user, HttpStatus.CREATED)
    }

    @PostMapping("/auth/login")
    fun loginUser(@RequestBody authRequest: AuthRequest): ResponseEntity<JwtResponse> {
        val response = userService.logUser(authRequest)
        return ResponseEntity(response, HttpStatus.OK)
    }

}
