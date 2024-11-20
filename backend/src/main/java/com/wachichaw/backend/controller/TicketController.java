package com.wachichaw.backend.controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.wachichaw.backend.entity.TicketEntity;
import com.wachichaw.backend.service.TicketService;

@RestController
@RequestMapping("/ticket")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class TicketController {
    
    
    @Autowired
    private TicketService ticketService;

    // Check
    @GetMapping("/print")
    public String print() {
        return "Hello, Ticket! Test";
    }

    // Create
    @PostMapping("/save")
    public TicketEntity saveTicket(@RequestBody TicketEntity ticket) {
        System.out.println("Incoming JSON Payload: " + ticket);
        return ticketService.saveTicket(ticket);
    }

    // Read
    @GetMapping("/getAll")
    public List<TicketEntity> getAllTickets() {
        return ticketService.getAllTickets();
    }
    // Update by ID
    @PutMapping("/update")
    public TicketEntity updateTicket(@RequestParam int Id, @RequestBody TicketEntity ticket) {
        return ticketService.updateTicket(Id, ticket);
    }

    @DeleteMapping("/delete/{ticketId}")
    public String deleteTicket(@PathVariable int id){
        return ticketService.deleteTicket(id);
    }
}
