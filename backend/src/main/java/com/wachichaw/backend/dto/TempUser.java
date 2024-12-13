package com.wachichaw.backend.dto;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import com.wachichaw.backend.entity.UserEntity;

@Service
public class TempUser{
    private final Map<String, UserEntity> unverifiedUsers = new ConcurrentHashMap<>();

    public void saveUnverifiedUser(String token, UserEntity user) {
        unverifiedUsers.put(token, user);
    }

    public UserEntity getUnverifiedUser(String token) {
        UserEntity user = unverifiedUsers.get(token);
        System.out.println("Retrieved user: " + (user != null ? user.getEmail() : "null"));
        return user;
    }
  

    public void removeUnverifiedUser(String token) {
        unverifiedUsers.remove(token);
    }
}