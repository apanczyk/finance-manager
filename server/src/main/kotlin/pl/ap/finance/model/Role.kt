package pl.ap.finance.model

import pl.ap.finance.exceptions.UserRoleNotFoundException

enum class Role {
    USER, ADMIN;

    companion object {
        fun roleOf(role: String?): Role {
            return when (role) {
                "USER" -> USER
                "ADMIN" -> ADMIN
                else -> throw UserRoleNotFoundException()
            }
        }
    }
}
