package pl.ap.finance.security.service

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import pl.ap.finance.model.User
import java.util.*

class UserDetailsImpl(
        val id: Long,
        val email: String,
        @JsonIgnore
        private val password: String,
        private val authorities: Collection<GrantedAuthority>
): UserDetails {

    override fun getAuthorities(): Collection<GrantedAuthority> {
        return authorities
    }

    override fun getPassword(): String {
        return password
    }

    override fun getUsername(): String {
        return email
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

    override fun equals(o: Any?): Boolean {
        if (this === o) return true
        if (o == null || javaClass != o.javaClass) return false
        val user = o as UserDetailsImpl
        return Objects.equals(id, user.id)
    }

    companion object {
        private const val serialVersionUID = 1L

        fun build(user: User): UserDetailsImpl {
            val authorities: List<GrantedAuthority> = listOf(SimpleGrantedAuthority(user.roles.name))
//                    user.roles.stream()
//                    .map { role -> SimpleGrantedAuthority(role.name.name) }
//                    .collect(Collectors.toList())
            return UserDetailsImpl(
                    user.id,
                    user.email,
                    user.password,
                    authorities)
        }
    }
}
