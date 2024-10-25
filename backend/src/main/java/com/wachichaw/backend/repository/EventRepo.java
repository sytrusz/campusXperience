package com.wachichaw.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wachichaw.backend.entity.EventEntity;

@Repository
public interface EventRepo extends JpaRepository<EventEntity, Integer> {

}
