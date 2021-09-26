package pl.ap.finance.model

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "users")
class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String,
    val registrationDate: LocalDateTime = LocalDateTime.now()
)