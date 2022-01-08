package pl.ap.finance.repository

import org.springframework.stereotype.Service
import pl.ap.finance.service.UserService

@Service
class UserTestService(private val userRepository: UserRepository,
                      private val userService: UserService) {

    fun removeAllUsers() {
        val allUsers = userRepository.findAll().map { it.id }
        allUsers.forEach{
            userService.removeUser(it)
        }
    }
}
