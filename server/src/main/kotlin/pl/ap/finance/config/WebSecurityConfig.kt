package pl.ap.finance.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import pl.ap.finance.security.UserAuthService

@EnableWebSecurity
@Configuration
class WebSecurityConfig : WebSecurityConfigurerAdapter() {

    @Autowired
    lateinit var userAuthService: UserAuthService

    override fun configure(http: HttpSecurity) {
        http.csrf().disable()
        http.headers().disable()
        http.httpBasic().authenticationEntryPoint { request, response, authException ->
            response.sendError(
                HttpStatus.UNAUTHORIZED.value(),
                HttpStatus.UNAUTHORIZED.reasonPhrase
            )
        }
        http
            .authorizeRequests()
            .antMatchers("/secured").authenticated()
            .antMatchers(HttpMethod.PUT, "/api/1.0/users/{id}").authenticated()
            .and()
            .authorizeRequests().anyRequest().permitAll()
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    override fun configure(auth: AuthenticationManagerBuilder) {
        auth.userDetailsService(userAuthService).passwordEncoder(passwordEncoder())
    }
}
