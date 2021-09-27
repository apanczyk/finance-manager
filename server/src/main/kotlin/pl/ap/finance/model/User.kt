package pl.ap.finance.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
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
    var password: String,
    val registrationDate: LocalDateTime = LocalDateTime.now(),
    @ManyToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER, mappedBy = "users")
    @JsonIgnoreProperties("users")
    val wallets: MutableSet<Wallet> = mutableSetOf()
) {
    fun addWallet(wallet: Wallet) {
        if (!wallets.contains(wallet)) {
            wallets.add(wallet)
            wallet.addUser(this)
        }
    }

    fun removeWallet(wallet: Wallet) {
        if (wallets.contains(wallet)) {
            wallets.remove(wallet)
            wallet.removeUser(this)
        }
    }
}