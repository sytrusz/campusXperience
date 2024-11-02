package com.wachichaw.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.wachichaw.backend.entity.AdminUserEntity;
@Repository
public interface AdminUserRepo extends JpaRepository<AdminUserEntity, Integer>{

}
