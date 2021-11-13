package pl.ap.finance.service

import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import pl.ap.finance.exceptions.EmailExistsException
import pl.ap.finance.exceptions.UserNotFoundException
import pl.ap.finance.model.Role
import pl.ap.finance.model.User
import pl.ap.finance.model.Wallet
import pl.ap.finance.model.dto.UserDto
import pl.ap.finance.model.dto.WalletDto
import pl.ap.finance.model.requests.AuthRequest
import pl.ap.finance.model.response.JwtResponse
import pl.ap.finance.repository.UserRepository
import pl.ap.finance.repository.WalletRepository
import pl.ap.finance.security.jwt.JwtUtils
import pl.ap.finance.security.service.UserDetailsImpl
import java.util.stream.Collectors


@Service
class UserService(private val passwordEncoder: PasswordEncoder,
                  private val userRepository: UserRepository,
                  private val walletRepository: WalletRepository,
                  private val authenticationManager: AuthenticationManager,
                  private val jwtUtils: JwtUtils) {

    fun registerUser(newUser: UserDto): User {
        if (userRepository.findUserByEmail(newUser.email) != null) {
            throw EmailExistsException("Account with given email address exists:" + newUser.email)
        }
        val encodedPassword = passwordEncoder.encode(newUser.password)
        val user = User(
                firstName = newUser.firstName,
                lastName = newUser.lastName,
                email = newUser.email,
                password = encodedPassword,
                role = Role.roleOf(newUser.role)
        )
        return userRepository.save(user)
    }

    fun logUser(authRequest: AuthRequest): JwtResponse {
        val authentication: Authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(authRequest.email, authRequest.password))

        SecurityContextHolder.getContext().authentication = authentication
        val jwt: String = jwtUtils.generateJwtToken(authentication)

        val userDetails = authentication.principal as UserDetailsImpl
        val role = userDetails.authorities.stream()
                .map { item: GrantedAuthority -> item.authority }
                .collect(Collectors.toList())

        return JwtResponse(
                accessToken = jwt,
                id = userDetails.id,
                email = userDetails.email,
                role = role[0]
        )
    }

    fun addWallet(userId: Long, walletDto: WalletDto): User {
        val user = userRepository.findById(userId).orElseThrow {
            throw UserNotFoundException("User with id $userId doesn't exist")
        }
        val wallet = Wallet(
                name = walletDto.name,
                currency = walletDto.currency,
                amount = walletDto.amount,
                isDefault = walletDto.isDefault
        )
        wallet.addUser(user)
        walletRepository.save(wallet)
        return user
    }
}
