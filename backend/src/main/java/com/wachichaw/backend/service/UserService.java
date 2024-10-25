package com.wachichaw.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wachichaw.backend.entity.UserEntity;
import com.wachichaw.backend.repository.UserRepo;

@Service
public class UserService {
    
    @Autowired
    private UserRepo userRepo;

    public UserService(){
        super();
    }

    // Create
    public UserEntity saveUser(UserEntity user) {
        return userRepo.save(user);
    }

    // Get all
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