package pl.ap.finance.exceptions

import java.io.IOException

sealed class EmailException(message: String? = null, cause: Exception? = null) : IOException(message, cause)

class EmailExistsException(message: String? = null, cause: Exception? = null) : EmailException(message, cause)
