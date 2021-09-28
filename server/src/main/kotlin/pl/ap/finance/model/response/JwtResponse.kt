package pl.ap.finance.model.response

import pl.ap.finance.model.Role

class JwtResponse(
        val token: String,
        val type: String = "Bearer",
        val id: Long,
        val email: String,
        var roles: List<String>
)
