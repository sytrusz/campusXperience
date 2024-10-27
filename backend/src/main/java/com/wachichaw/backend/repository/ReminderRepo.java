package com.wachichaw.backend.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.wachichaw.backend.entity.ReminderEntity;
@Repository

public interface ReminderRepo extends JpaRepository<ReminderEntity, Integer>{

}
