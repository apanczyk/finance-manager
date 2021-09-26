package pl.ap.finance.model

import java.time.LocalDateTime
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Table

@Entity
@Table(name = "wallets")
data class Wallet(
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String,
    val amount: Double,
    val place: String,
    val date: LocalDateTime = LocalDateTime.now()
)