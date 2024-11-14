package com.wachichaw.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wachichaw.backend.entity.UserEntity;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Integer>{
    UserEntity findByEmail(String email);
  
    boolean existsByEmail(String email);
}
