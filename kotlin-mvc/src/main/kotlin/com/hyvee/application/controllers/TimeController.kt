package com.hyvee.application.controllers

import com.hyvee.application.domain.Time
import com.hyvee.application.repositories.TimeRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class TimeController(
    private val timeRepository: TimeRepository
) {
    @GetMapping("/time")
    fun getTime() = timeRepository.getTime()?.let {
        Time(it)
    }
}
