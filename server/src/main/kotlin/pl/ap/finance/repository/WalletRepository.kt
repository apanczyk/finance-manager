package pl.ap.finance.repository

import org.springframework.data.jpa.repository.JpaRepository
import pl.ap.finance.model.Operation
import pl.ap.finance.model.Wallet

interface WalletRepository: JpaRepository<Wallet, Long>