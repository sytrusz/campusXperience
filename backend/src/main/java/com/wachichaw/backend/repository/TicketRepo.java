package com.wachichaw.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.wachichaw.backend.entity.TicketEntity;


@Repository
public interface TicketRepo extends JpaRepository<TicketEntity, Integer>{
 
}
