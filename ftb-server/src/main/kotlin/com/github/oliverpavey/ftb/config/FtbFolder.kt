package com.github.oliverpavey.ftb.config

import jakarta.annotation.PostConstruct
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.io.File
import java.nio.file.Files
import java.nio.file.Path

class FtbFolderException(message: String) : RuntimeException(message)

@Component
class FtbFolder {

    private val logger = LoggerFactory.getLogger(javaClass)

    @Value("#{systemProperties['ftb_storage_folder']?:T(java.lang.System).getenv('FTB_STORAGE_FOLDER')?:''}")
    private lateinit var storageFolder: String

    fun storageFolder(): String = storageFolder.ifEmpty {
        Files.createDirectories(Path.of(System.getProperty("user.home"),".ftb"))
            .toFile().absolutePath.also { storageFolder = it }
    }

    fun checkFolder() {
        val storageFile = File(storageFolder())
        if (!storageFile.exists() || !storageFile.isDirectory)
            throw FtbFolderException("Storage folder does not exist")
    }

    @PostConstruct
    private fun postConstruct() {
        logger.info("Storage Folder: {}", storageFolder())

        val storageFile = File(storageFolder())
        if (!storageFile.exists())
            logger.error("Storage folder does not exist.")
        if (!storageFile.isDirectory)
            logger.error("Storage folder is not a folder.")
    }
}
