package pl.ap.finance.model

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import java.time.LocalDateTime
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "wallet_table")
class Wallet(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String,
    val currency: Currency,
    val amount: Double,
    val date: LocalDateTime = LocalDateTime.now(),
    val isDefault: Boolean,
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_wallet_table",
        joinColumns = [JoinColumn(name = "wallet_id")],
        inverseJoinColumns = [JoinColumn(name = "user_id")]
    )
    @JsonIgnore
    val users: MutableSet<User> = mutableSetOf(),
    @JsonIgnore
    @OneToMany(mappedBy = "_wallet", cascade = [CascadeType.ALL], fetch = FetchType.EAGER, orphanRemoval = true)
    val operations: MutableSet<Operation> = mutableSetOf()
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

    fun addOperation(operation: Operation) {
        if (!operations.contains(operation)) {
            operations.add(operation)
            operation.wallet = this
        }
    }

    fun removeOperation(operation: Operation) {
        if(operations.contains(operation)) {
            operations.remove(operation);
            operation.wallet = null
        }
    }
}
