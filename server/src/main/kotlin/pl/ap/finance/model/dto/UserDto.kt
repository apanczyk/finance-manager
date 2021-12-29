package pl.ap.finance.model.dto

import pl.ap.finance.model.Role
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size

class UserDto(
        val firstName: String?,
        val lastName: String?,
        @NotBlank
        @Email
        val email: String,
        @NotBlank
        @Size(min = 4, max = 20)
        var password: String,
        var role: String = Role.USER.name
)
