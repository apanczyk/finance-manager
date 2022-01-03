package pl.ap.finance.it

import org.assertj.core.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import pl.ap.finance.model.dto.WalletDto
import pl.ap.finance.model.response.GroupedOperation
import pl.ap.finance.repository.CategoryRepository
import pl.ap.finance.repository.WalletRepository
import pl.ap.finance.service.WalletService
import pl.ap.finance.util.TestData
import pl.ap.finance.util.TestData.Companion.CATEGORY

@SpringBootTest
class WalletIT {

    @Autowired
    private lateinit var walletService: WalletService

    @Autowired
    private lateinit var walletRepository: WalletRepository

    @Autowired
    private lateinit var categoryRepository: CategoryRepository

    @BeforeEach
    fun remove() {
        walletRepository.deleteAll()
    }

    @Test
    fun `should add operation to the wallet`() {
        //given
        val request = WalletDto.toWallet(TestData.WALLET)
        val wallet = walletRepository.save(request)
        categoryRepository.save(CATEGORY)

        //when
        val response = walletService.addOperation(wallet.id, TestData.OPERATION)

        //then
        Assertions.assertThat(response.operations).anyMatch { it.amount == TestData.AMOUNT }
        Assertions.assertThat(response.operations).anyMatch { it.name == TestData.NAME }
        Assertions.assertThat(response.operations).anyMatch { it.place == TestData.PLACE }
    }

    @Test
    fun `should return list with months`() {
        val months = 12L
        val list = walletService.createMonthList(months)

        Assertions.assertThat(list.size).isEqualTo(months)
    }
}