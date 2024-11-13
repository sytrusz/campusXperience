package com.wachichaw.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.wachichaw.backend.entity.EventEntity;
import com.wachichaw.backend.service.EventService;


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
    public EventEntity updateEvent(@RequestParam int eventId, @RequestBody EventEntity event) {
        return eventService.updateEvent(eventId, event);
    }

    // Delete by ID 
    @DeleteMapping("/delete/{eventID}")
    public String deleteEvent(@PathVariable int eventID) {
        return eventService.deleteEvent(eventID);
    }
}