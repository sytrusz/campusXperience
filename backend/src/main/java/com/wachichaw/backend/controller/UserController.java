package com.wachichaw.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.wachichaw.backend.auth.JwtUtil;
import com.wachichaw.backend.entity.UserEntity;
import com.wachichaw.backend.repository.UserRepo;
import com.wachichaw.backend.service.UserService;
import com.wachichaw.backend.service.VerificationService;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private final VerificationService verificationService;
    @Autowired
    private UserRepo userRepo;
    private final JwtUtil jwtUtil;

    public UserController(JwtUtil jwtUtil, VerificationService verificationService) {
        this.jwtUtil = jwtUtil;
        this.verificationService = verificationService;
    }

    
   

    // Token
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserEntity user) {
        UserEntity existingUser = userRepo.findByEmail(user.getEmail());
    
        if (!existingUser.isVerified()) { 
            System.out.print("Account is not verified. Please check your email for the verification link.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Account is not verified. Please check your email for the verification link."));
        }
    
        String token = userService.authenticateUser(user.getEmail(), user.getPassword());
        
        // Extract details from token
        int id = Integer.parseInt(jwtUtil.extractUserId(token));
        String name = jwtUtil.extractUsername(token);
        String profPic = jwtUtil.extractProfpic(token);
    
        // Prepare response
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("id", id);
        response.put("name", name);
        response.put("prof_pic", profPic);
    
        System.out.println(response);
        return ResponseEntity.ok(response);
    }
    
    
    // Check Email uniqueness
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmailUnique(@RequestParam String email) {
        boolean isEmailUnique = !userService.existsByEmail(email);
        return ResponseEntity.ok(isEmailUnique);
    }

    // Check
    @GetMapping("/print")
    public String print() {
        return "Hello, User! Test";
    }

    // Create


    @PostMapping("/save")
    public UserEntity saveUser(@RequestBody UserEntity user) {
        // Save the user
        UserEntity savedUser = userService.saveUser(user);
        System.out.print(savedUser.getEmail() + "\n" +savedUser.getName());
        verificationService.sendVerificationEmail(savedUser.getEmail(), savedUser.getName());

        return savedUser;
    }

    
    // Get all
    @GetMapping("/getAll")
    public List<UserEntity> getAllUser() {
        return userService.getAllUser();
    }

    // Update by ID
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(
        @RequestParam int userId,
        @RequestParam(value = "file", required = false) MultipartFile file, // Optional profile picture upload
        @RequestParam("currentPassword") String currentPassword,
        @RequestParam("name") String name,
        @RequestParam("email") String email,
        @RequestParam("newPassword") String newPassword
    ) {
        try {
            // Call the service to update the user
            UserEntity updatedUser = userService.updateUser(userId, file, currentPassword, name, email, newPassword);
    
            // Return the updated user details in the response
            return ResponseEntity.ok(updatedUser);
    
        } catch (RuntimeException e) {
            // Handle errors like incorrect password or email already in use
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            // Handle any other exceptions
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", "An error occurred while updating the user"));
        }
    }
    
    @PutMapping("/update-password")
    public ResponseEntity<?> updatePassword(
            @RequestParam int userId,
            @RequestParam String currentPassword,
            @RequestParam String newPassword) {
        try {
            // Return success message
            return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
        } catch (RuntimeException e) {
            // Handle incorrect password or other runtime issues
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }
    
    
    // Delete by ID
    @DeleteMapping("/delete/{userId}")
    public String deleteUser(@PathVariable int userId){
        return userService.deleteUser(userId);
    }
}
