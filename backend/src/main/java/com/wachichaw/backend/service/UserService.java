package com.wachichaw.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.wachichaw.backend.auth.JwtUtil;
import com.wachichaw.backend.controller.ImageUploadController;
import com.wachichaw.backend.entity.UserEntity;
import com.wachichaw.backend.repository.UserRepo;

@Service
public class UserService {
    
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private ImageUploadController imageUploadController;  

    public UserService(){
        super();
    }

    // Create
    public UserEntity saveUser(MultipartFile file, String name, String email, String password,
                                 String createdAt) {

        try {
            String imageUrl = imageUploadController.uploadProfpic(file);

            UserEntity newUser = new UserEntity();
            newUser.setName(name);
            newUser.setEmail(email);
            newUser.setPassword(password);  
            newUser.setCreatedAt(java.time.LocalDateTime.parse(createdAt));  
            newUser.setProfPic(imageUrl);  

            System.out.println(imageUrl);
            return userRepo.save(newUser);

        } catch (Exception e) {
            throw new RuntimeException("Error while saving the event: " + e.getMessage());
        }
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
    @SuppressWarnings("finally")
    public UserEntity updateUser(int id, UserEntity updatedUser) {
        UserEntity userEntity = new UserEntity();

        try{
            userEntity = userRepo.findById(id).get();
            
            userEntity.setName(updatedUser.getName());
            userEntity.setEmail(updatedUser.getEmail());
            userEntity.setPassword(updatedUser.getPassword());
        }catch(NoSuchElementException nex){
            throw new Exception ("User " + id + " not found");
        }finally{
            return userRepo.save(userEntity);
        }
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