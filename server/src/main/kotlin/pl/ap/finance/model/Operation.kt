package pl.ap.finance.model

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "operation_table")
class Operation(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String,
    val amount: Double,
    val place: String,
    val date: LocalDateTime = LocalDateTime.now(),
    @ManyToOne(fetch = FetchType.LAZY)
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
