package com.hyvee.application.controllers

import com.hyvee.application.domain.Time
import com.hyvee.application.repositories.TimeRepository
import com.nhaarman.mockito_kotlin.mock
import io.github.benas.randombeans.api.EnhancedRandom
import org.amshove.kluent.When
import org.amshove.kluent.calling
import org.amshove.kluent.itReturns
import org.junit.Assert
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test

@Suppress("ClassName")
class TimeControllerTest {
    private lateinit var timeRepository: TimeRepository
    private lateinit var timeController: TimeController

    @BeforeEach
    fun beforeEach() {
        timeRepository = mock()

        timeController = TimeController(timeRepository)
    }

    @Nested
    inner class GetTime {
        @Nested
        inner class `given time is found` {
            private lateinit var currentTimestamp: String

            @BeforeEach
            fun setupGetTime() {
                currentTimestamp = EnhancedRandom.random(String::class.java)

                When calling timeRepository.getTime() itReturns currentTimestamp
            }

            @Test
            fun `should return current time`() {
                val result = timeController.getTime()

                Assert.assertEquals(Time(currentTimestamp), result)
            }
        }

        @Nested
        inner class `given no time is found` {
            @BeforeEach
            fun setupTimeNotFound() {
                When calling timeRepository.getTime() itReturns null
            }

            @Test
            fun `should return null`() {
                val result = timeController.getTime()

                Assert.assertNull(result)
            }
        }
    }
}
