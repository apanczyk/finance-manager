package pl.ap.finance.service

import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import pl.ap.finance.exceptions.EmailExistsException
import pl.ap.finance.exceptions.UserNotFoundException
import pl.ap.finance.model.User
import pl.ap.finance.model.Wallet
import pl.ap.finance.model.dto.UserDto
import pl.ap.finance.model.dto.WalletDto
import pl.ap.finance.repository.UserRepository
import pl.ap.finance.repository.WalletRepository

@Service
class UserService(private val passwordEncoder: PasswordEncoder,
                  private val userRepository: UserRepository,
                  private val walletRepository: WalletRepository) {

    fun registerUser(newUser: UserDto): User {
        if(userRepository.findUserByEmail(newUser.email) != null) {
            throw EmailExistsException("Account with given email address exists:" + newUser.email)
        }
        val encodedPassword =  passwordEncoder.encode(newUser.password)
        val user = User(
                firstName = newUser.firstName,
                lastName = newUser.lastName,
                email = newUser.email,
                password = encodedPassword
        )
        return userRepository.save(user)
    }

    fun addWallet(userId: Long, walletDto: WalletDto): User {
        val user = userRepository.findById(userId).orElseThrow {
            throw UserNotFoundException("User with id $userId doesn't exist")
        }
        val wallet = Wallet(
            name = walletDto.name,
            currency = walletDto.currency,
            amount = walletDto.amount
        )
        wallet.addUser(user)
        walletRepository.save(wallet)
        return user
    }
}
