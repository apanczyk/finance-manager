package pl.ap.finance.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "user_table")
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
    val wallets: MutableSet<Wallet> = mutableSetOf(),
//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(	name = "user_roles_table",
//            joinColumns = [JoinColumn(name = "user_id")],
//            inverseJoinColumns = [JoinColumn(name = "role_id")])
        val roles: Role.RoleType

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
