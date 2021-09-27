package pl.ap.finance.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import pl.ap.finance.model.User
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import pl.ap.finance.repository.UserRepository

@Service
class UserAuthService : UserDetailsService {

    @Autowired
    lateinit var userRepository: UserRepository

    override fun loadUserByUsername(email: String?): UserDetails {
        val user: User = email?.let { userRepository.findUserByEmail(it) } ?: throw UsernameNotFoundException("User not found")

        return object : UserDetails {
            override fun getAuthorities(): Collection<GrantedAuthority?> {
                return AuthorityUtils.createAuthorityList("user")
            }

            override fun getPassword(): String {
                return user.password
            }

            override fun getUsername(): String {
                return user.email
            }

            override fun isAccountNonExpired(): Boolean {
                return true
            }

            override fun isAccountNonLocked(): Boolean {
                return true
            }

            override fun isCredentialsNonExpired(): Boolean {
                return true
            }

            override fun isEnabled(): Boolean {
                return true
            }
        }    }
}