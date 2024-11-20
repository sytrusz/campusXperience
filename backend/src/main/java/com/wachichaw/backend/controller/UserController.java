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
import com.wachichaw.backend.service.UserService;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    
   

    // Token
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserEntity user) {
        String token = userService.authenticateUser(user.getEmail(), user.getPassword());
    
        // Extract claims from the token
        int id = Integer.parseInt(jwtUtil.extractUserId(token)); // Ensure the id is parsed as an integer
        String name = jwtUtil.extractUsername(token);
        String profPic = jwtUtil.extractProfpic(token);
    
        // Prepare the response
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("id", id); // Add the id as an integer
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
    public ResponseEntity<UserEntity> saveUser(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("createdAt") String createdAt
            ) {
        
                UserEntity savedUser = userService.saveUser(file, name, email, password, createdAt);
        System.out.println(file); // Debugging output

        return ResponseEntity.ok(savedUser);
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
        @RequestParam("email") String email
    ) {
        try {
            // Call the service to update the user
            UserEntity updatedUser = userService.updateUser(userId, file, currentPassword, name, email);
    
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
    
    
    // Delete by ID
    @DeleteMapping("/delete/{userId}")
    public String deleteUser(@PathVariable int userId){
        return userService.deleteUser(userId);
    }
}
