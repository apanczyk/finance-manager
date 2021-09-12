package pl.ap.finance.controller

import org.bson.types.ObjectId
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pl.ap.finance.model.Operation
import pl.ap.finance.repository.OperationsRepository
import pl.ap.finance.request.OperationRequest

@RestController
@RequestMapping("/operations")
class OperationsController(val operationsRepository: OperationsRepository) {

    @GetMapping
    fun getAllOperations(): ResponseEntity<List<Operation>> {
        val operations = operationsRepository.findAll()
        return ResponseEntity.ok(operations)
    }

    @GetMapping("/{id}")
    fun getOneOperation(@PathVariable("id") id: String): ResponseEntity<Operation> {
        val operation = operationsRepository.findOneById(ObjectId(id))
        return ResponseEntity.ok(operation)
    }

    @PostMapping
    fun createOperation(@RequestBody request: OperationRequest): ResponseEntity<Operation> {
        val operation = operationsRepository.save(Operation(
            name = request.name,
            amount = request.amount,
            place = request.place
        ))
        return ResponseEntity(operation, HttpStatus.CREATED)
    }
}
