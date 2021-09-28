package pl.ap.finance.model.dto

import pl.ap.finance.model.Role

class UserDto(
        val firstName: String,
        val lastName: String,
        val email: String,
        var password: String,
        var roles: MutableSet<Role>
)
