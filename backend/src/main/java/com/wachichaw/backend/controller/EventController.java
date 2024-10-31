package com.wachichaw.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.wachichaw.backend.entity.EventEntity;
import com.wachichaw.backend.service.EventService;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "http://localhost:5173")
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
    public EventEntity saveEvent(@RequestBody EventEntity event) {
        return eventService.saveEvent(event);
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