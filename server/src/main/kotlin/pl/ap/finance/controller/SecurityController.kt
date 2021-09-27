package pl.ap.finance.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class SecurityController {

    @GetMapping("/secured")
    fun secured(): String? {
        return "This is secured endpoint"
    }


    @GetMapping("/public")
    fun pub(): String? {
        return "This is public endpoint"
    }
}