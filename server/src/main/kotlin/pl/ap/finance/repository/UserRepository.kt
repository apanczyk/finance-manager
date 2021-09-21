package pl.ap.finance.repository

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import pl.ap.finance.model.User

@Repository
interface UserRepository : MongoRepository<User, String> {

}
