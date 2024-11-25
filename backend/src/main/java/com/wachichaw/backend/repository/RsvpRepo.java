package com.wachichaw.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wachichaw.backend.entity.RsvpEntity;

@Repository
public interface RsvpRepo extends JpaRepository<RsvpEntity, Integer> {
    List<RsvpEntity> findByUser_UserId(int userId);
}
