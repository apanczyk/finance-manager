package pl.ap.finance.model

import pl.ap.finance.exceptions.UserRoleNotFoundException
import javax.persistence.*

@Entity
@Table(name = "role_table")
class Role(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,
        @Enumerated(EnumType.STRING)
        @Column(length = 20)
        val name : RoleType
) {
    enum class RoleType {
        USER, ADMIN;

        companion object {
            fun roleOf(role: String): RoleType {
                return when(role) {
                    "User" -> USER
                    "Admin" -> ADMIN
                    else -> throw UserRoleNotFoundException()
                }
            }
        }
    }
}
