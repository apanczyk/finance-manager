package pl.ap.finance.exceptions

import java.io.IOException

sealed class UsersException(message: String? = null, cause: Exception? = null) : IOException(message, cause)

class EmailExistsException(message: String? = null, cause: Exception? = null) : UsersException(message, cause)

class UserNotFoundException(message: String? = null, cause: Exception? = null) : UsersException(message, cause)

class WalletNotFoundException(message: String? = null, cause: Exception? = null) : UsersException(message, cause)

class UserRoleNotFoundException(message: String? = null, cause: Exception? = null) : UsersException(message, cause)

class CategoryTypeNotFoundException(message: String? = null, cause: Exception? = null) : UsersException(message, cause)
