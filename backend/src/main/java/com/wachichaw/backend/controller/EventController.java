package com.wachichaw.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.wachichaw.backend.entity.EventEntity;
import com.wachichaw.backend.service.EventService;

import io.jsonwebtoken.io.IOException;


@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class EventController {

    @Autowired
    private EventService eventService;

    // Check
    @GetMapping("/print")
    public String print() {
        return "Hello, Event! Test";
    }

    // Create
  @PostMapping("/save")
    public ResponseEntity<EventEntity> saveEvent(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("startTime") String startTime,
            @RequestParam("endTime") String endTime,
            @RequestParam("location") String location,
            @RequestParam("maxCapacity") int maxCapacity) {
        
        EventEntity savedEvent = eventService.saveEvent(file, title, description, startTime, endTime, location, maxCapacity);
        return ResponseEntity.ok(savedEvent);
    }

    // Get all
    @GetMapping("/getAll")
    public List<EventEntity> getAllEvent() {
        return eventService.getAllEvent();
    }

    // Update by ID
    @PutMapping("/update")
public ResponseEntity<EventEntity> updateEvent(
        @RequestParam int eventId,  // Event ID to identify the event to update
        @RequestParam(value = "file", required = false) MultipartFile file,  // Optional file upload
        @RequestParam("title") String title,
        @RequestParam("description") String description,
        @RequestParam("startTime") String startTime,
        @RequestParam("endTime") String endTime,
        @RequestParam("location") String location,
        @RequestParam("maxCapacity") int maxCapacity) throws java.io.IOException {

    EventEntity updatedEvent = null;
    try {
        updatedEvent = eventService.updateEvent(eventId, file, title, description, startTime, endTime, location, maxCapacity);
    } catch (IOException e) {
        e.printStackTrace();  
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);  // Return a 500 error if the file processing fails
    }

    if (updatedEvent == null) {
        // Return a 404 response if no event was found or update failed
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    return ResponseEntity.ok(updatedEvent);  // Return the updated event if everything went well
}
    

    // Delete by ID 
    @DeleteMapping("/delete/{eventID}")
    public String deleteEvent(@PathVariable int eventID) {
        return eventService.deleteEvent(eventID);
    }
}