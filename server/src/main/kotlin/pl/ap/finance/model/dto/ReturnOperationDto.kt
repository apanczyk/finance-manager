package pl.ap.finance.model.dto

import com.fasterxml.jackson.annotation.JsonIgnore
import pl.ap.finance.model.Category
import pl.ap.finance.model.Operation
import pl.ap.finance.model.Wallet
import pl.ap.finance.service.WalletService
import java.time.LocalDate
import javax.persistence.FetchType
import javax.persistence.ManyToOne

class ReturnOperationDto (val id: Long,
                          val name: String,
                          val amount: Double,
                          val place: String,
                          val category: Category,
                          val categoryType: String,
                          val categoryName: String,
                          val date: LocalDate = LocalDate.now(),
                          var _wallet: Wallet? = null) {
    companion object {
        fun toReturnOperationDto(operation: Operation) : ReturnOperationDto {
            return ReturnOperationDto(
                operation.id,
                operation.name,
                operation.amount,
                operation.place,
                operation.category,
                WalletService.capitalize(operation.category.type.name),
                WalletService.capitalize(operation.category.name),
                operation.date,
                operation._wallet
            )
        }
    }
}