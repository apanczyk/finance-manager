package pl.ap.finance.model

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "operations")
class Operation(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String,
    val amount: Double,
    val place: String,
    val date: LocalDateTime = LocalDateTime.now()
)
