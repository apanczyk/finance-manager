package pl.ap.finance.it

import org.assertj.core.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import pl.ap.finance.IntegrationTest
import pl.ap.finance.model.dto.WalletDto
import pl.ap.finance.repository.WalletRepository
import pl.ap.finance.service.WalletService
import pl.ap.finance.util.TestData

@SpringBootTest
class WalletIT {

    @Autowired
    private lateinit var walletService: WalletService

    @Autowired
    private lateinit var walletRepository: WalletRepository

    @BeforeEach
    fun remove() {
        walletRepository.deleteAll()
    }

    @Test
    fun `should add operation to the wallet`() {
        //given
        val request = WalletDto.toWallet(TestData.WALLET)
        val wallet = walletRepository.save(request)

        //when
        val response = walletService.addOperation(wallet.id, TestData.OPERATION)

        //then
        Assertions.assertThat(response.operations.any { it.amount == TestData.AMOUNT })
        Assertions.assertThat(response.operations.any { it.name == TestData.NAME })
        Assertions.assertThat(response.operations.any { it.place == TestData.PLACE })
    }
}
