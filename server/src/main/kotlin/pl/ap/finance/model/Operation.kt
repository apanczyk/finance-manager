package pl.ap.finance.model

import com.fasterxml.jackson.annotation.JsonIgnore
import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "operation_table")
class Operation(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0L,
    val name: String,
    val amount: Double,
    val place: String,
    @ManyToOne(fetch = FetchType.LAZY)
    val category: Category,
    val date: LocalDate = LocalDate.now(),
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    var _wallet: Wallet? = null,
) {
    var wallet: Wallet?
        get() = _wallet
        set(wallet) {
            if(wallet == null) {
                _wallet?.removeOperation(this)
            } else {
                wallet.addOperation(this)
            }
            _wallet = wallet
        }


}
