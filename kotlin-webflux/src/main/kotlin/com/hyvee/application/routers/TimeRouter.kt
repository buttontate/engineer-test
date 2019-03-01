package com.hyvee.application.routers

import com.hyvee.application.handlers.TimeHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.MediaType
import org.springframework.web.reactive.function.server.router

@Configuration
class TimeRouter(private val timeHandler: TimeHandler) {
    @Bean
    fun timeRoutes() = router {
        accept(MediaType.APPLICATION_JSON).nest {
            "/time".nest {
                GET("", timeHandler::getTime)
            }
        }
    }
}
