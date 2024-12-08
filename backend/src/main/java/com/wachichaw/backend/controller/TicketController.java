package com.wachichaw.backend.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
public ResponseEntity<TicketEntity> saveTicket(@RequestBody TicketEntity ticket) {
    try {
        System.out.println("Incoming JSON Payload: " + ticket);
        TicketEntity savedTicket = ticketService.saveTicket(ticket);
        
        // Return a successful response with the ticket and a custom header
        return ResponseEntity
                .ok()
                .header("X-Custom-Success", "Ticket saved successfully")
                .body(savedTicket);
    } catch (ResponseStatusException ex) {
        if (HttpStatus.BAD_REQUEST.equals(ex.getStatusCode())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .header("X-Custom-Error", "No slots available for this event")
                    .body(null); 
        }
        
        throw ex;
    }
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
