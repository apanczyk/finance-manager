package pl.ap.finance.repository

import pl.ap.finance.model.Role
import java.util.*

interface RoleRepository {
    fun findByName(name: Role): Optional<Role>
}
