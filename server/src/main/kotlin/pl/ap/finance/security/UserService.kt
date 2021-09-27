package pl.ap.finance.security

import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import pl.ap.finance.exceptions.EmailExistsException
import pl.ap.finance.model.User
import pl.ap.finance.repository.UserRepository

@Service
class UserService(private val passwordEncoder: PasswordEncoder, private val userRepository: UserRepository) {

    fun registerUser(user: User): User {
        if(userRepository.findUserByEmail(user.email) != null) {
            throw EmailExistsException("Account with given email address exists:" + user.email)
        }
        user.password = passwordEncoder.encode(user.password)

        return userRepository.save(user)
    }
}
