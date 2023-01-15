package com.github.oliverpavey.ftb

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FtbApplication

fun main(args: Array<String>) {
	runApplication<FtbApplication>(*args)
}
