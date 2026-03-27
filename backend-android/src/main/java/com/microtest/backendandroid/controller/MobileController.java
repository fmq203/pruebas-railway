package com.microtest.backendandroid.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/mobile/api/v1")
@CrossOrigin(origins = "*")
public class MobileController {

    @GetMapping("/ping")
    public Map<String, String> ping() {
        return Map.of("service", "backend-android", "version", "1.0");
    }

    @GetMapping("/status")
    public Map<String, String> status() {
        return Map.of("service", "backend-android", "status", "ok");
    }
}
