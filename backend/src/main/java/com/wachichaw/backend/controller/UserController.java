package com.wachichaw.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.wachichaw.backend.auth.JwtUtil;
import com.wachichaw.backend.entity.UserEntity;
import com.wachichaw.backend.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5174")
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
    response.put("prof_pic", jwtUtil.extractProfpic(token));
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
    public UserEntity updateUser(@RequestParam int userId, @RequestBody UserEntity user) {
        return userService.updateUser(userId, user);
    }

    // Delete by ID
    @DeleteMapping("/delete/{userId}")
    public String deleteUser(@PathVariable int userId){
        return userService.deleteUser(userId);
    }
}
