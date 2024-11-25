package com.wachichaw.backend.controller;

import com.wachichaw.backend.dto.EmailRequest;
import com.wachichaw.backend.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
@Slf4j
public class EmailController {

    private final EmailService emailService;
    
    @PostMapping("/send")
    @PreAuthorize("isAuthenticated()")  // Add security check
    public ResponseEntity<String> sendEmail(@Valid @RequestBody EmailRequest emailRequest) {
        log.info("Received email request: {}", emailRequest);
        
        try {
            emailService.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
            return ResponseEntity.ok("Email sent successfully!");
        } catch (RuntimeException e) {
            log.error("Error while sending email: {}", e.getMessage(), e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to send email: " + e.getMessage());
        }
    }
}