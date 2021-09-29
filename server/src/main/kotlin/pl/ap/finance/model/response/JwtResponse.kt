package pl.ap.finance.model.response

class JwtResponse(
        val token: String,
        val type: String = "Bearer",
        val id: Long,
        val email: String,
        var roles: List<String>
)
