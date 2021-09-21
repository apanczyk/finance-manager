package pl.ap.finance.model

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document
data class User(
    @Id
    val id: String = ObjectId.get().toString(),
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String,
    val registrationDate: LocalDateTime = LocalDateTime.now()
)