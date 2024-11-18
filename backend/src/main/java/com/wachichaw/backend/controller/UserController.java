package com.wachichaw.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Map<String, String>> login(@RequestBody UserEntity user) {
    
    String token = userService.authenticateUser(user.getEmail(), user.getPassword());
    Map<String, String> response = new HashMap<>();
    response.put("token", token);
    response.put("name", jwtUtil.extractUsername(token));
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
        return userService.saveUser(user);
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
        @RequestBody Map<String, String> updateRequest
    ) {
        try {
            // Extract data from the request
            String currentPassword = updateRequest.get("currentPassword");
            String newPassword = updateRequest.get("newPassword");
            String name = updateRequest.get("name");
            String email = updateRequest.get("email");
    
            // Create a temporary UserEntity object to pass to the service
            UserEntity updatedUser = new UserEntity();
            updatedUser.setUserId(userId);
            updatedUser.setName(name);
            updatedUser.setEmail(email);
            updatedUser.setPassword(currentPassword);
            updatedUser.setNewPassword(newPassword);
    
            // Call the service to update the user
            UserEntity savedUser = userService.updateUser(userId, updatedUser);
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
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
