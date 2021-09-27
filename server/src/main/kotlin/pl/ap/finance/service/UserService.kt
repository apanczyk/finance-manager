package pl.ap.finance.service

import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import pl.ap.finance.exceptions.EmailExistsException
import pl.ap.finance.exceptions.UserNotFoundException
import pl.ap.finance.model.User
import pl.ap.finance.model.Wallet
import pl.ap.finance.model.dto.WalletDto
import pl.ap.finance.repository.UserRepository
import pl.ap.finance.repository.WalletRepository

@Service
class UserService(private val passwordEncoder: PasswordEncoder, private val userRepository: UserRepository, private val walletRepository: WalletRepository) {

    fun registerUser(user: User): User {
        if(userRepository.findUserByEmail(user.email) != null) {
            throw EmailExistsException("Account with given email address exists:" + user.email)
        }
        user.password = passwordEncoder.encode(user.password)

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
