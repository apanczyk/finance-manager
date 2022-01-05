package pl.ap.finance.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pl.ap.finance.model.Operation
import pl.ap.finance.model.dto.OperationDto
import pl.ap.finance.repository.CategoryRepository
import pl.ap.finance.repository.OperationRepository
import pl.ap.finance.repository.WalletRepository
import java.time.LocalDate

@RestController
@RequestMapping("/api/operations")
class OperationController(val operationsRepository: OperationRepository,
                          val categoryRepository: CategoryRepository,
                          val walletRepository: WalletRepository
                          ) {

    @GetMapping
    fun getAllOperations(): ResponseEntity<List<Operation>> {
        val operations = operationsRepository.findAll()
        return ResponseEntity.ok(operations)
    }

    @GetMapping("/{id}")
    fun getOneOperation(@PathVariable("id") id: Long): ResponseEntity<Operation> {
        val operation = operationsRepository.findOneById(id)
        return ResponseEntity.ok(operation)
    }

    @PostMapping
    fun createOperation(@RequestBody request: OperationDto): ResponseEntity<Operation> {
        val category = categoryRepository.findById(request.category.id)
        val wallet = walletRepository.findById(request.walletId)
        val operation = operationsRepository.save(
            Operation(
                name = request.name,
                amount = request.amount,
                place = request.place,
                category = category.get(),
                _wallet = wallet.get(),
                date = request.date ?: LocalDate.now()
            )
        )
        return ResponseEntity(operation, HttpStatus.CREATED)
    }

    @PostMapping("/{id}")
    fun updateOperation(@PathVariable("id") id: Long, @RequestBody request: OperationDto): ResponseEntity<Operation> {
        val category = categoryRepository.findById(request.category.id)
        val wallet = walletRepository.findById(request.walletId)
        val previousOperation = operationsRepository.findOneById(id)
        val operationToUpdate = operationsRepository.save(
            Operation(
                id = id,
                name = request.name,
                amount = request.amount,
                place = request.place,
                category = category.get(),
                _wallet = wallet.get(),
                date = request.date ?: previousOperation.date
            )
        )
        return ResponseEntity(operationToUpdate, HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteOperation(@PathVariable("id") id: Long): ResponseEntity<Operation> {
        operationsRepository.deleteById(id)
        return ResponseEntity.ok().build()
    }
}
