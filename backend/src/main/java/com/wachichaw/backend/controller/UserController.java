package com.wachichaw.backend.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wachichaw.backend.entity.UserEntity;
import com.wachichaw.backend.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;
    


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserEntity user) {
    System.out.println("Login request received"); // Debugging output
    String token = userService.authenticateUser(user.getEmail(), user.getPassword());
    System.out.println(token); // Debugging output
    return ResponseEntity.ok(token);
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
    public UserEntity updateUser(@RequestParam int userId, @RequestBody UserEntity user) {
        return userService.updateUser(userId, user);
    }

    // Delete by ID
    @DeleteMapping("/delete/{userId}")
    public String deleteUser(@PathVariable int userId){
        return userService.deleteUser(userId);
    }
}
