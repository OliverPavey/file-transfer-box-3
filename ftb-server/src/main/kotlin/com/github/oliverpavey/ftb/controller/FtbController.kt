package com.github.oliverpavey.ftb.controller

import com.github.oliverpavey.ftb.config.FtbFolder
import org.slf4j.LoggerFactory
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.io.File
import java.io.FileInputStream
import java.io.FileNotFoundException

data class FileInfo(val name: String, val bytes: Long, val modified: Long)

@RestController
@RequestMapping("/api")
class FtbController(val folderConfig: FtbFolder) {

    private val logger = LoggerFactory.getLogger(javaClass)

    // e.g. curl http://localhost:8080/api
    @GetMapping(value = ["", "/"])
    fun index(): String = """
        File Transfer Box 2 Endpoints:
        GET    /                    - The GUI Application.
        GET    /api                 - This help text.
        GET    /api/list            - List the files available.
        GET    /api/pull/<filename> - Download a file.
        POST   /api/push/<filename> - Upload a file (sending the file as the POST body).
        DELETE /api/drop/<filename> - Delete a file.
    """.trimIndent()

    // e.g. curl http://localhost:8080/api/list
    @GetMapping(value = ["/list", "/list/"])
    fun list(): List<FileInfo> = (File(folderConfig.storageFolder()).listFiles() ?: arrayOf<File>())
        .filter { file -> !file.isDirectory && file.canRead() }
        .map { file -> FileInfo(file.name, file.length(), file.lastModified()) }

    // e.g. curl http://localhost:8080/api/pull/MyFile.zip --output MyFile.zip
    @GetMapping("/pull/{name}")
    fun pull(@PathVariable name: String): ResponseEntity<ByteArray> {
        logger.info("Pulling file: {}", name)
        folderConfig.checkFolder()

        val input = File(folderConfig.storageFolder(), name)
        val inputStream = FileInputStream(input)
        val inputData = ByteArray(input.length().toInt())
        inputStream.read(inputData)

        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_OCTET_STREAM
        headers.set("Content-Disposition", "inline; filename=\"${input.name}\"")
        headers.contentLength = inputData.size.toLong()
        headers.cacheControl = "no-cache"

        return ResponseEntity<ByteArray>(inputData, headers, HttpStatus.OK)
    }

    // e.g. curl http://localhost:8080/api/push/MyFile.zip -X POST
    //      --header "Content-Type: application/octet-stream"
    //      --data-binary "@MyFile.zip"
    @PostMapping("/push/{name}")
    fun push(@PathVariable name: String, @RequestBody data: ByteArray): ResponseEntity<String> {
        logger.info("Pushing file: {}", name)
        folderConfig.checkFolder()

        val output = File(folderConfig.storageFolder(), name)
        output.writeBytes(data)

        return ResponseEntity("Received '${name}' ${data.size} bytes.", HttpStatus.OK)
    }

    // e.g. curl http://localhost:8080/api/drop/MyFile.zip -X DELETE
    @DeleteMapping("/drop/{name}")
    fun drop(@PathVariable name: String): ResponseEntity<String> {
        logger.info("Dropping file: {}", name)
        folderConfig.checkFolder()

        val file = File(folderConfig.storageFolder(), name)
        if (file.isDirectory || !file.exists())
            throw FileNotFoundException("Missing file '${name}'.")
        if (!file.delete()) // Delete the file.
            throw FileNotFoundException("Could not delete '${name}'.")

        return ResponseEntity("Dropped '${name}.", HttpStatus.OK)
    }

    @GetMapping("/folder")
    fun folder() = folderConfig.storageFolder()
}
