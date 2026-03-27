package com.microtest.backendweb.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class HelloController {

    @GetMapping("/status")
    public Map<String, String> status() {
        return Map.of("service", "backend-web", "status", "ok");
    }
}
