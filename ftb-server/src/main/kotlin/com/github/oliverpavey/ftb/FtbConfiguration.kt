package com.github.oliverpavey.ftb

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfiguration : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) { // Do not block any requests with CORS.
        registry.addMapping("/**").allowedMethods("*")
    }
}