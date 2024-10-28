package com.wachichaw.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.wachichaw.backend.entity.UserEntity;
import com.wachichaw.backend.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

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
