package in.smcoder.cybercode.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthCheck {

    @GetMapping("/public/health-check")
    public ResponseEntity<String> publicHealthCheck() {
        return ResponseEntity.ok("Running - from public");
    }

    @GetMapping("/private/health-check")
    public ResponseEntity<String> privateHealthCheck() {
        return ResponseEntity.ok("Running - from private");
    }
}
