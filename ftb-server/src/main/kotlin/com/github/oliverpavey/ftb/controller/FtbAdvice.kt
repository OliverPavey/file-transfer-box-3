package com.github.oliverpavey.ftb.controller

import com.github.oliverpavey.ftb.config.FtbFolderException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import java.io.FileNotFoundException

class ErrorInfo(val status: Int, val message: String)

@ControllerAdvice
class FtbAdvice {

    @ExceptionHandler
    fun handleConfigurationException(ex: FtbFolderException): ResponseEntity<ErrorInfo> {
        val info = ErrorInfo(HttpStatus.PRECONDITION_FAILED.value(), "${ex::class.simpleName}: ${ex.message}")
        return ResponseEntity.status(info.status).body(info)
    }

    @ExceptionHandler
    fun handleFileNotFoundException(ex: FileNotFoundException): ResponseEntity<ErrorInfo> {
        val info = ErrorInfo(HttpStatus.NOT_FOUND.value(), "File Not Found: ${ex.message}")
        return ResponseEntity.status(info.status).body(info)
    }

    @ExceptionHandler
    fun handleUnexpectedException(ex: Exception): ResponseEntity<ErrorInfo> {
        val info = ErrorInfo(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Unexpected Exception: ${ex::class.simpleName}")
        return ResponseEntity.status(info.status).body(info)
    }
}