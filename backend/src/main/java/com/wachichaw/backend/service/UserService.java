package com.wachichaw.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wachichaw.backend.auth.JwtUtil;
import com.wachichaw.backend.entity.UserEntity;
import com.wachichaw.backend.repository.UserRepo;

@Service
public class UserService {
    
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JwtUtil jwtUtil;

    public UserService(){
        super();
    }

    // Create
    public UserEntity saveUser(UserEntity user) {
        return userRepo.save(user);
    }

    // Read
   public String authenticateUser(String email, String password) {
    System.out.println("Authenticating user with email: " + email); 
    UserEntity user = userRepo.findByEmail(email); 

        if (user != null) {
            System.out.println("User found: " + user.getEmail()); 
            if (user.getPassword().equals(password)) { 
                System.out.println("Password is correct. Generating token."); 
                System.out.println(jwtUtil.generateToken(user)); 
                return jwtUtil.generateToken(user); 
            } else {
                System.out.println("Invalid credentials: password does not match."); 
                throw new RuntimeException("Invalid credentials"); 
            }
        } else {
            System.out.println("User not found with email: " + email); 
            throw new RuntimeException("User not found"); 
        }
    }

    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    public List<UserEntity> getAllUser() {
        return userRepo.findAll();
    }

    // Get by ID
    public Optional<UserEntity> getUserById(int id) {
        return userRepo.findById(id);
    }

    // Update by ID
    public UserEntity updateUser(int id, UserEntity updatedUser) {
        // Retrieve the existing user
        UserEntity existingUser = userRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
    
        // Verify the current password
        if (!existingUser.getPassword().equals(updatedUser.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
    
        // Update name if provided
        if (updatedUser.getName() != null && !updatedUser.getName().isEmpty()) {
            existingUser.setName(updatedUser.getName());
        }
    
        // Check if the email is being updated and if it's unique
        if (updatedUser.getEmail() != null && !existingUser.getEmail().equals(updatedUser.getEmail())) {
            if (userRepo.existsByEmail(updatedUser.getEmail())) {
                throw new RuntimeException("Email already in use");
            }
            existingUser.setEmail(updatedUser.getEmail());
        }
    
        // Update password if a new one is provided
        if (updatedUser.getNewPassword() != null && !updatedUser.getNewPassword().isEmpty()) {
            existingUser.setPassword(updatedUser.getNewPassword());
        }
    
        // Save and return the updated user
        return userRepo.save(existingUser);
    }
    

    // Delete by ID
    @SuppressWarnings("unused")
    public String deleteUser(int id) {
        String msg = " ";
        if (userRepo.findById(id)!=null){
            userRepo.deleteById(id);
            msg = "User record successfully deleted!";
        }else
            msg = id + "NOT FOUND!";
        return msg;
    }
}