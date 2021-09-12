package pl.ap.finance.repository

import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.MongoRepository
import pl.ap.finance.model.Operation

interface OperationsRepository : MongoRepository<Operation, String> {
    fun findOneById(id: ObjectId): Operation
}
