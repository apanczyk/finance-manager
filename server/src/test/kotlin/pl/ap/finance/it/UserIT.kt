package pl.ap.finance.it

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import pl.ap.finance.IntegrationTest
import pl.ap.finance.exceptions.EmailExistsException
import pl.ap.finance.repository.UserRepository
import pl.ap.finance.security.UserService
import pl.ap.finance.util.TestData.Companion.EMAIL
import pl.ap.finance.util.TestData.Companion.FIRST_NAME
import pl.ap.finance.util.TestData.Companion.LAST_NAME
import pl.ap.finance.util.TestData.Companion.USER

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
        assertThat(FIRST_NAME).isEqualTo(response.firstName)
        assertThat(LAST_NAME).isEqualTo(response.lastName)
        assertThat(EMAIL).isEqualTo(response.email)
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
}
