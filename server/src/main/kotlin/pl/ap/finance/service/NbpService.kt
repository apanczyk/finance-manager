package pl.ap.finance.service

import org.springframework.stereotype.Service
import org.springframework.http.HttpEntity
import org.springframework.http.HttpMethod
import org.springframework.web.client.RestTemplate
import pl.ap.finance.model.response.NbpObject

@Service
class NbpService {

    fun sendToNbp(currency: String): NbpObject? {
        val rest = RestTemplate()
        val exchange = rest.exchange(
            "http://api.nbp.pl/api/exchangerates/rates/a/$currency",
            HttpMethod.GET,
            HttpEntity.EMPTY,
            NbpObject::class.java
        )
        return exchange.body
    }
}