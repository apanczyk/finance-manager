package pl.ap.finance.model.response

class JwtResponse(
        val accessToken: String,
        val id: Long,
        val email: String,
        var role: String
)
