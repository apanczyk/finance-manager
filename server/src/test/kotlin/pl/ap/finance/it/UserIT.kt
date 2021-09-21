package pl.ap.finance.it

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import pl.ap.finance.IntegrationTest
import pl.ap.finance.repository.UserRepository
import pl.ap.finance.util.TestData.Companion.EMAIL
import pl.ap.finance.util.TestData.Companion.FIRST_NAME
import pl.ap.finance.util.TestData.Companion.LAST_NAME
import pl.ap.finance.util.TestData.Companion.PASSWORD
import pl.ap.finance.util.TestData.Companion.USER

@IntegrationTest
class UserIT {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Test
    fun `should create user`() {
        //given
        val request = USER
        val result = userRepository.save(request)

        //when
        val response = userRepository.findById(result.id).get()

        //then
        assertThat(FIRST_NAME).isEqualTo(response.firstName)
        assertThat(LAST_NAME).isEqualTo(response.lastName)
        assertThat(EMAIL).isEqualTo(response.email)
        assertThat(PASSWORD).isEqualTo(response.password)
    }
}
