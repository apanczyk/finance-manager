package pl.ap.finance.controller

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pl.ap.finance.service.UserService

@RestController
@RequestMapping("/api/wallets")
class WalletController(private val walletService: UserService)