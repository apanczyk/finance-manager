package pl.ap.finance.service

import org.springframework.stereotype.Service
import pl.ap.finance.exceptions.WalletNotFoundException
import pl.ap.finance.model.CategoryType
import pl.ap.finance.model.Operation
import pl.ap.finance.model.Wallet
import pl.ap.finance.model.dto.OperationDto
import pl.ap.finance.model.response.CurrencyTable
import pl.ap.finance.model.response.GroupedGeneral
import pl.ap.finance.model.response.GroupedOperation
import pl.ap.finance.model.response.MonthDiagram
import pl.ap.finance.repository.CategoryRepository
import pl.ap.finance.repository.WalletRepository
import java.math.RoundingMode
import java.text.DecimalFormat
import java.time.LocalDate
import java.time.format.TextStyle
import java.util.Calendar
import java.util.Locale


@Service
class WalletService(private val walletRepository: WalletRepository,
                    private val categoryRepository: CategoryRepository,
                    private val nbpService: NbpService) {

    fun addOperation(walletId: Long, operationDto: OperationDto): Wallet {
        val category = categoryRepository.findById(operationDto.category.id)
        val wallet = walletRepository.findById(walletId).orElseThrow {
            throw WalletNotFoundException("Wallet with id $walletId doesn't exist")
        }
        val operation = Operation(
            name = operationDto.name,
            amount = operationDto.amount,
            place = operationDto.place,
            category = category.orElseThrow()
        )
        wallet.addOperation(operation)
        walletRepository.save(wallet)
        return wallet
    }

    fun monthDiagram(wallet: Wallet, month: String): List<MonthDiagram> {
        val operations = wallet.operations
        val monthDiagram = mutableListOf<MonthDiagram>()

        val monthsFromLastYear = createMonthList(MONTHS_IN_YEAR)
        val previousYear = LocalDate.now().minusMonths(MONTHS_IN_YEAR)

        for (eachMonth in 1..MONTHS_IN_YEAR) {
            if (monthsFromLastYear[(eachMonth - 1).toInt()] == month) {
                val currentRotationDate = previousYear.plusMonths(eachMonth)
                val currentMonth = LocalDate.of(currentRotationDate.year, currentRotationDate.monthValue, 1)
                val nextMonth = currentMonth.plusMonths(1)

                val groupedByCategory = operations.filter {
                    it.date.isAfter(
                        currentMonth
                    ) && it.date.isBefore(
                        nextMonth
                    ) && it.category.type == CategoryType.COST
                }.groupBy { it.category.name }

                groupedByCategory.forEach{
                    val category = capitalize(it.key)
                    val sumCost = it.value.sumOf { operation -> operation.amount }
                    monthDiagram.add(MonthDiagram(category, sumCost))
                }
            }
        }

        return monthDiagram
    }

    fun groupOperations(wallet: Wallet, diagramType: String) : List<GroupedOperation> {
        return when (diagramType) {
            "last year" -> groupOperationsByYear(wallet)
            "month" -> groupOperationsByMonth(wallet)
            else -> emptyList()
        }
    }

    fun groupOperationsByMonth(wallet: Wallet): List<GroupedOperation> {
        val operations = wallet.operations

        val groupedOperation = mutableListOf<GroupedOperation>()
        val days = Calendar.getInstance().getActualMaximum(Calendar.DAY_OF_MONTH)
        val currentMonth = LocalDate.now()

        for (day in 1..days) {
            val cost = operations.filter {
                it.date > LocalDate.now().withDayOfMonth(1) &&
                it.date < LocalDate.now().withDayOfMonth(days) &&
                it.date.dayOfMonth == day && it.category.type == CategoryType.COST
            }.sumOf { it.amount }
            val income = operations.filter {
                it.date > LocalDate.now().withDayOfMonth(1) &&
                it.date < LocalDate.now().withDayOfMonth(days) &&
                it.date.dayOfMonth == day && it.category.type == CategoryType.INCOME
            }.sumOf { it.amount }
            groupedOperation.add(
                GroupedOperation(
                    "${
                        LocalDate.now().withDayOfMonth(day).dayOfWeek.getDisplayName(
                            TextStyle.SHORT,
                            Locale.US
                        )
                    } - $day", cost.toInt(), income.toInt()
                )
            )
        }
        return groupedOperation
    }

    fun groupGeneral(wallet: Wallet): List<GroupedGeneral> {
        val operations = wallet.operations

        val groupedOperation = mutableListOf<GroupedGeneral>()
        val monthsFromLastYear = createMonthList(MONTHS_IN_YEAR)
        val previousYear = LocalDate.now().minusMonths(MONTHS_IN_YEAR)

        val generalCost = operations.filter {
            it.date.isBefore(
                previousYear
            ) && it.category.type == CategoryType.COST
        }.sumOf { it.amount }

        val generalIncome = operations.filter {
            it.date.isBefore(
                previousYear
            ) && it.category.type == CategoryType.INCOME
        }.sumOf { it.amount }

        var general = generalIncome - generalCost

        for (month in 1..MONTHS_IN_YEAR) {
            val currentRotationDate = previousYear.plusMonths(month)
            val currentMonth = LocalDate.of(currentRotationDate.year, currentRotationDate.monthValue, 1)
            val nextMonth = currentMonth.plusMonths(1)

            val filter = operations.filter {
                it.date.isAfter(
                    currentMonth
                ) && it.date.isBefore(
                    nextMonth
                )
            }

            val cost = filter.filter {
                it.category.type == CategoryType.COST
            }.sumOf { it.amount }

            val income = filter.filter {
                it.category.type == CategoryType.INCOME
            }.sumOf { it.amount }

            val counted = income - cost
            general += counted

            groupedOperation.add(GroupedGeneral(capitalize(monthsFromLastYear[(month - 1).toInt()]), general.toInt(), counted.toInt()))
        }

        return groupedOperation
    }

    fun groupOperationsByYear(wallet: Wallet): List<GroupedOperation> {
        val operations = wallet.operations

        val groupedOperation = mutableListOf<GroupedOperation>()
        val monthsFromLastYear = createMonthList(MONTHS_IN_YEAR)
        val previousYear = LocalDate.now().minusMonths(MONTHS_IN_YEAR)

        for (month in 1..MONTHS_IN_YEAR) {
            val currentRotationDate = previousYear.plusMonths(month)
            val currentMonth = LocalDate.of(currentRotationDate.year, currentRotationDate.monthValue, 1)
            val nextMonth = currentMonth.plusMonths(1)

            val filter = operations.filter {
                it.date.isAfter(
                    currentMonth
                ) && it.date.isBefore(
                    nextMonth
                )
            }
            val cost = filter.filter {
                it.category.type == CategoryType.COST
            }.sumOf { it.amount }
            val income = filter.filter {
                it.category.type == CategoryType.INCOME
            }.sumOf { it.amount }

            groupedOperation.add(GroupedOperation(capitalize(monthsFromLastYear[(month - 1).toInt()]), cost.toInt(), income.toInt()))
        }

        return groupedOperation
    }

    fun createDayList(): MutableList<String> {
        val groupedOperation = mutableListOf<String>()
        val days = Calendar.getInstance().getActualMaximum(Calendar.DAY_OF_MONTH)
        for (day in 1..days) {
            groupedOperation.add(day.toString())
        }
        return groupedOperation
    }

    fun createMonthList(months: Long): MutableList<String> {
        val groupedOperation = mutableListOf<String>()
        val previousYear = LocalDate.now().minusMonths(months)
        for (month in 1..months) {
            groupedOperation.add(capitalize(previousYear.plusMonths(month).month.name))
        }
        return groupedOperation
    }

    fun getCurrencyTable(wallet: Wallet): MutableList<CurrencyTable> {
        val operations = wallet.operations

        val generalCost = operations.filter {
            it.category.type == CategoryType.COST
        }.sumOf { it.amount }

        val generalIncome = operations.filter {
            it.category.type == CategoryType.INCOME
        }.sumOf { it.amount }

        val generalAmount = generalIncome - generalCost

        return try {
            val euroConversion = nbpService.sendToNbp("EUR")
            val dollarConversion = nbpService.sendToNbp("USD")

            val defaultCurrency = wallet.currency.currencyCode

            if (defaultCurrency == "PLN") {
                val firstVal = generalAmount
                val secondValue = generalAmount / euroConversion?.rates?.get(0)?.mid!!
                val thirdValue = generalAmount / dollarConversion?.rates?.get(0)?.mid!!
                convertToCurrencyTable(firstVal, secondValue, thirdValue)
            } else if (defaultCurrency == "EUR") {
                val pln = generalAmount * euroConversion?.rates?.get(0)?.mid!!
                val firstVal = pln
                val secondValue = generalAmount
                val thirdValue = pln / dollarConversion?.rates?.get(0)?.mid!!
                convertToCurrencyTable(firstVal, secondValue, thirdValue)
            } else {
                val pln = generalAmount * dollarConversion?.rates?.get(0)?.mid!!
                val firstVal = pln
                val secondValue = pln / euroConversion?.rates?.get(0)?.mid!!
                val thirdValue = generalAmount
                convertToCurrencyTable(firstVal, secondValue, thirdValue)
            }

        } catch (exception: Exception) {
            throw Exception(exception.message)
        }
    }

    fun convertToCurrencyTable(firstVal: Double, secondValue: Double, thirdValue: Double): MutableList<CurrencyTable> {
        val currencyTable = arrayListOf<CurrencyTable>()
        currencyTable.add(CurrencyTable("PLN", String.format("%.2f", firstVal) ))
        currencyTable.add(CurrencyTable("EUR", String.format("%.2f", secondValue) ))
        currencyTable.add(CurrencyTable("USD", String.format("%.2f", thirdValue) ))
        return currencyTable
    }

    companion object {
        const val MONTHS_IN_YEAR = 12L

        fun capitalize(word: String): String = word.substring(0, 1).uppercase() + word.substring(1).lowercase()
    }
}
