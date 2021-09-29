package pl.ap.finance.security.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import pl.ap.finance.model.User
import pl.ap.finance.repository.UserRepository
import javax.transaction.Transactional


@Service
class UserDetailsServiceImpl : UserDetailsService {

    @Autowired
    lateinit var userRepository: UserRepository

    @Transactional
    override fun loadUserByUsername(email: String): UserDetails {
        val user: User = userRepository.findByEmail(email)
                .orElseThrow {
                    UsernameNotFoundException("User Not Found with username: $email")
                }
        return UserDetailsImpl.build(user)
    }
}
