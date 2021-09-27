package pl.ap.finance.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import java.time.LocalDateTime
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "wallets")
class Wallet(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String,
    val currency: Currency,
    val amount: Double,
    val date: LocalDateTime = LocalDateTime.now(),
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_wallet",
        joinColumns = [JoinColumn(name = "wallet_id")],
        inverseJoinColumns = [JoinColumn(name = "user_id")]
    )
    @JsonIgnoreProperties("wallets")
    val users: MutableSet<User> = mutableSetOf()
) {
    fun addUser(user: User) {
        if (!users.contains(user)) {
            users.add(user)
            user.addWallet(this)
        }
    }

    fun removeUser(user: User) {
        if (users.contains(user)) {
            users.remove(user)
            user.removeWallet(this)
        }
    }
}