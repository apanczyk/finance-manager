package pl.ap.finance.it

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import pl.ap.finance.IntegrationTest
import pl.ap.finance.exceptions.EmailExistsException
import pl.ap.finance.repository.UserRepository
import pl.ap.finance.service.UserService
import pl.ap.finance.util.TestData.Companion.AMOUNT
import pl.ap.finance.util.TestData.Companion.CURRENCY
import pl.ap.finance.util.TestData.Companion.EMAIL
import pl.ap.finance.util.TestData.Companion.FIRST_NAME
import pl.ap.finance.util.TestData.Companion.LAST_NAME
import pl.ap.finance.util.TestData.Companion.NAME
import pl.ap.finance.util.TestData.Companion.USER
import pl.ap.finance.util.TestData.Companion.WALLET

@IntegrationTest
class UserIT {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var userService: UserService

    @BeforeEach
    fun remove() {
        userRepository.deleteAll()
    }

    @Test
    fun `should create user`() {
        //given
        val request = USER
        val result = userService.registerUser(request)

        //when
        val response = userRepository.findById(result.id).get()

        //then
        assertThat(response.firstName).isEqualTo(FIRST_NAME)
        assertThat(response.lastName).isEqualTo(LAST_NAME)
        assertThat(response.email).isEqualTo(EMAIL)
    }

    @Test
    fun `should throw email exception while creating user`() {
        //given
        val request = USER
        userService.registerUser(request)

        //when
        val result = assertThrows<EmailExistsException> { userService.registerUser(request) }

        //then
        assertThat(result.message).isEqualTo("Account with given email address exists:" + request.email)
    }

    @Test
    fun `should add wallet for user`() {
        //given
        val request = USER
        val response = userService.registerUser(request)

        //when
        userService.addWallet(response.id, WALLET)

        //then
        assertThat(response.wallets.any { it.amount == AMOUNT })
        assertThat(response.wallets.any { it.name == NAME })
        assertThat(response.wallets.any { it.currency == CURRENCY })
    }
}
