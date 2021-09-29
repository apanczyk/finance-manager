package pl.ap.finance.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import pl.ap.finance.model.User
import java.util.*

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findUserByEmail(email: String): User?
    fun findByEmail(email: String): Optional<User>
    fun existsByEmail(email: String): Boolean
}
