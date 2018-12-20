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
import org.jetbrains.spek.api.Spek
import org.jetbrains.spek.api.dsl.describe
import org.jetbrains.spek.api.dsl.it
import org.jetbrains.spek.api.dsl.on
import org.junit.Assert
import org.springframework.test.web.reactive.server.WebTestClient

object TimeTests : Spek({
    describe("TimeRoutes") {
        lateinit var timeHandler: TimeHandler
        lateinit var timeRepository: TimeRepository
        lateinit var webTestClient: WebTestClient

        beforeEachTest {
            timeRepository = mock()
            timeHandler = TimeHandler(timeRepository)

            webTestClient = WebTestClient.bindToRouterFunction(TimeRouter(timeHandler).timeRoutes())
                .build()
        }

        on("get time when time is returned") {
            val currentTimestamp = random(String::class.java)

            When calling timeRepository.getTime() itReturns currentTimestamp

            val actualResponse = webTestClient.get()
                .uri("/time")
                .exchange()

            it("should return OK status code") {
                actualResponse.expectStatus().isOk
            }

            it("should return current time as response body") {
                val expectedTime = Time(currentTimestamp)

                Assert.assertEquals(expectedTime,
                    actualResponse
                        .expectBody(Time::class.java)
                        .returnResult().responseBody
                )
            }
        }

        on("get time when no time is found") {
            When calling timeRepository.getTime() itReturns null

            val actualResponse = webTestClient.get()
                .uri("/time")
                .exchange()

            it("should return NOT_FOUND status") {
                actualResponse.expectStatus().isNotFound
            }
        }
    }
})
