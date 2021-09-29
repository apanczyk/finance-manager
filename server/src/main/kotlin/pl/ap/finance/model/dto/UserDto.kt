package pl.ap.finance.model.dto

class UserDto(
        val firstName: String,
        val lastName: String,
        val email: String,
        var password: String,
        var role: String
)
