package com.wachichaw.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wachichaw.backend.entity.EventEntity;
import com.wachichaw.backend.entity.TicketEntity;
import com.wachichaw.backend.entity.UserEntity;
import com.wachichaw.backend.repository.EventRepo;
import com.wachichaw.backend.repository.TicketRepo;
import com.wachichaw.backend.repository.UserRepo;

@Service
public class TicketService {
      @Autowired
    private TicketRepo ticketRepo;
   
    @Autowired
    private EventRepo eventRepository;
   
    @Autowired
    private UserRepo userRepository;
    
    public TicketService() {
        super();
    }

      // Create
      public TicketEntity saveTicket(TicketEntity ticket) {
        EventEntity event = eventRepository.findById(ticket.getEvent().getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + ticket.getEvent().getEventId()));
    
        // Fetch the UserEntity by userId
        UserEntity user = userRepository.findById(ticket.getUser().getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + ticket.getUser().getUserId()));
    
        ticket.setEventEntity(event);
        ticket.setUserEntity(user);
    
        return ticketRepo.save(ticket);
    }
    
     // Get all
    public List<TicketEntity> getAllTickets() {
        return ticketRepo.findAll();
    }

    // Get by ID
    public Optional<TicketEntity> getTicketById(int id) {
        return ticketRepo.findById(id);
    }


    // Update by ID
    public TicketEntity updateTicket(int id, TicketEntity updatedTicket) {
        TicketEntity existingTicket = ticketRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Reminder " + id + " not found"));
       
        // Fetch Event and User before updating
        EventEntity event = eventRepository.findById(updatedTicket.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));
        UserEntity user = userRepository.findById(updatedTicket.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
 
                existingTicket.setEventEntity(event);
                existingTicket.setUserEntity(user);
                existingTicket.setTicketType(updatedTicket.getTicketType());
                existingTicket.setPrice(updatedTicket.getPrice());
                existingTicket.setPurchaseTime(updatedTicket.getPurchaseTime());
 
        return ticketRepo.save(existingTicket);
    }

    // Delete by ID
    @SuppressWarnings("unused")
    public String deleteTicket(int id) {
        if (ticketRepo.existsById(id)) {
            ticketRepo.deleteById(id);
            return "Ticket record successfully deleted!";
        } else {
            return "Ticket with ID " + id + " not found!";
        }
    }
 
    // Get event ID from reminder
    public Integer getEventIdFromTicket(int Id) {
        TicketEntity ticket = ticketRepo.findById(Id)
                .orElseThrow(() -> new NoSuchElementException("Ticket not found"));
        return ticket.getEventId();
    }
 
    // Get user ID from reminder
    public Integer getUserIdFromReminder(int Id) {
        TicketEntity ticket = ticketRepo.findById(Id)
                .orElseThrow(() -> new NoSuchElementException("Reminder not found"));
        return ticket.getUserId();
    }
}
