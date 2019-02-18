package com.hyvee.application.routes

import com.hyvee.application.domain.Time
import com.hyvee.application.handlers.TimeHandler
import com.hyvee.application.repositories.TimeRepository
import com.hyvee.application.routers.TimeRouter
import com.nhaarman.mockito_kotlin.mock
import io.github.benas.randombeans.api.EnhancedRandom.random
import org.amshove.kluent.When
import org.amshove.kluent.calling
import org.amshove.kluent.itReturns
import org.junit.Assert
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.springframework.test.web.reactive.server.WebTestClient

@Suppress("ClassName")
class TimeTests {
    private lateinit var timeHandler: TimeHandler
    private lateinit var timeRepository: TimeRepository
    private lateinit var webTestClient: WebTestClient

    @BeforeEach
    fun beforeEach() {
        timeRepository = mock()
        timeHandler = TimeHandler(timeRepository)

        webTestClient = WebTestClient.bindToRouterFunction(TimeRouter(timeHandler).timeRoutes())
            .build()
    }

    @Nested
    inner class GetTime {
        @Nested
        inner class `given time is found` {
            private lateinit var currentTimestamp: String

            @BeforeEach
            fun setupGetTime() {
                currentTimestamp = random(String::class.java)

                When calling timeRepository.getTime() itReturns currentTimestamp
            }

            @Test
            fun `should return OK status code`() {
                webTestClient.get()
                    .uri("/time")
                    .exchange()
                    .expectStatus().isOk
            }

            @Test
            fun `should return current time as response body`() {
                val expectedTime = Time(currentTimestamp)

                Assert.assertEquals(expectedTime,
                    webTestClient.get()
                        .uri("/time")
                        .exchange()
                        .expectBody(Time::class.java)
                        .returnResult().responseBody
                )
            }
        }

        @Nested
        inner class `given no time is found` {
            @BeforeEach
            fun setupTimeNotFound() {
                When calling timeRepository.getTime() itReturns null
            }

            @Test
            fun `should return NOT_FOUND status`() {
                webTestClient.get()
                    .uri("/time")
                    .exchange()
                    .expectStatus().isNotFound
            }
        }
    }
}
