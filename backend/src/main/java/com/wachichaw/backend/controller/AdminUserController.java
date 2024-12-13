package com.wachichaw.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wachichaw.backend.auth.JwtUtil;
import com.wachichaw.backend.entity.AdminUserEntity;
import com.wachichaw.backend.service.AdminUserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")

public class AdminUserController {
    @Autowired
    private AdminUserService adminUserService;
    private final JwtUtil jwtUtil;

     public AdminUserController(JwtUtil jwtUtil ) {
        this.jwtUtil = jwtUtil;
    }

    // Check
    @GetMapping("/print")
    public String print() {
        return "Hello, Admin! Test";
    }

    // Admin Login

    @PostMapping("/login")

    public ResponseEntity<Map<String, String>> login(@RequestBody AdminUserEntity admin) {

        String token = adminUserService.authenticateAdmin(admin.getEmail(), admin.getPassword());
        
        Map<String, String> response = new HashMap<>();
        String name = jwtUtil.extractUsername(token);


        response.put("token", token);
        response.put("name", name);
        response.put("role", "Admin");
        return ResponseEntity.ok(response);
    }

    // Create
    @PostMapping("/save")
    public AdminUserEntity saveAdmin(@RequestBody AdminUserEntity admin) {
        return adminUserService.saveAdmin(admin);
    }

    // Get all
    @GetMapping("/getAll")
    public List<AdminUserEntity> getAllAdmin() {
        return adminUserService.getAllAdmin();
    }

    // Update by ID
    @PutMapping("/update")
    public AdminUserEntity updateAdmin(@RequestParam int adminId, @RequestBody AdminUserEntity admin) {
        return adminUserService.updateAdmin(adminId, admin);
    }

    // Delete by ID
    @DeleteMapping("/delete/{adminId}")
    public String deleteAdmin(@PathVariable int adminId) {
        return adminUserService.deleteAdmin(adminId);
    }
}
