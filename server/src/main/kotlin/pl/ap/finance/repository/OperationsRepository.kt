package pl.ap.finance.repository

import org.springframework.data.jpa.repository.JpaRepository
import pl.ap.finance.model.Operation

interface OperationsRepository : JpaRepository<Operation, Long> {
    fun findOneById(id: Long): Operation
}
