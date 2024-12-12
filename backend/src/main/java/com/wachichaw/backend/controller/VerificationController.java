package com.wachichaw.backend.controller;
import java.nio.file.AccessDeniedException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.wachichaw.backend.dto.TempUser;
import com.wachichaw.backend.entity.UserEntity;
import com.wachichaw.backend.service.UserService;
import com.wachichaw.backend.service.VerificationService;

@RestController
public class VerificationController {
    @SuppressWarnings("unused")
    private final VerificationService verificationService;
    @Autowired
    private TempUser tempUserStorageService;

    
    public VerificationController(VerificationService verificationService) {
        this.verificationService = verificationService;
    }

    @Autowired
    private UserService userService; // Assume this is your user service

    @GetMapping("/verify")
    public RedirectView verifyAccount(@RequestParam("token") String token, @RequestParam("email") String email) throws AccessDeniedException {
        UserEntity user = tempUserStorageService.getUnverifiedUser(token);

       
        userService.saveUser(user);
        userService.verifyUser(email); 
        return new RedirectView("http://localhost:5173/login");
            
    }
}
