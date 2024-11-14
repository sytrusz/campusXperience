package com.wachichaw.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wachichaw.backend.entity.RsvpEntity;

@Repository
public interface RsvpRepo extends JpaRepository<RsvpEntity, Integer> {

}
