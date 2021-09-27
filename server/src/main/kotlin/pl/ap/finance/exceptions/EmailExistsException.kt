package pl.ap.finance.exceptions

import java.io.IOException

sealed class UserException(message: String? = null, cause: Exception? = null) : IOException(message, cause)

class EmailExistsException(message: String? = null, cause: Exception? = null) : UserException(message, cause)

class UserNotFoundException(message: String? = null, cause: Exception? = null) : UserException(message, cause)

class WalletNotFoundException(message: String? = null, cause: Exception? = null) : UserException(message, cause)
