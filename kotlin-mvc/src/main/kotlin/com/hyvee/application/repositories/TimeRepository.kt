package com.hyvee.application.repositories

import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository

@Repository
class TimeRepository(private val jdbcTemplate: JdbcTemplate) {
    fun getTime(): String? {
        return jdbcTemplate.queryForObject("select current_timestamp", String::class.java)
    }
}
