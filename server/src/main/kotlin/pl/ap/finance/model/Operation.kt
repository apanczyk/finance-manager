package pl.ap.finance.model

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document
import java.math.BigDecimal
import java.time.LocalDateTime

@Document
data class Operation(
    @Id
    val id: ObjectId = ObjectId.get(),
    val name: String,
    val amount: Double,
    val date: LocalDateTime = LocalDateTime.now(),
    val place: String
)
