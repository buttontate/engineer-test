package com.hyvee.application.handlers

import com.hyvee.application.domain.Time
import com.hyvee.application.repositories.TimeRepository
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.server.ServerRequest
import org.springframework.web.reactive.function.server.ServerResponse
import reactor.core.publisher.Mono

@Service
class TimeHandler(private val timeRepository: TimeRepository) {
    fun getTime(serverRequest: ServerRequest): Mono<ServerResponse> {
        return timeRepository.getTime()?.let {
            ServerResponse.ok().syncBody(Time(it))
        } ?: ServerResponse.notFound().build()
    }
}
