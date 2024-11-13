package com.wachichaw.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.NoSuchElementException;

import com.wachichaw.backend.controller.ImageUploadController;
import com.wachichaw.backend.entity.EventEntity;
import com.wachichaw.backend.repository.EventRepo;

@Service
public class EventService {
    
    @Autowired
    private EventRepo eventRepo;


     @Autowired
    private ImageUploadController imageUploadController;  

    public EventService(){
        super();
    }

    // Save Event with Image
    public EventEntity saveEvent(MultipartFile file, String title, String description, String startTime,
                                 String endTime, String location, int maxCapacity) {

        try {
            String imageUrl = imageUploadController.uploadImage(file);

            EventEntity newEvent = new EventEntity();
            newEvent.setTitle(title);
            newEvent.setDescription(description);
            newEvent.setStartTime(java.time.LocalDateTime.parse(startTime));  
            newEvent.setEndTime(java.time.LocalDateTime.parse(endTime));  
            newEvent.setLocation(location);
            newEvent.setMaxCapacity(maxCapacity);
            newEvent.setImageUrl(imageUrl);  


            return eventRepo.save(newEvent);

        } catch (Exception e) {
            throw new RuntimeException("Error while saving the event: " + e.getMessage());
        }
    }

    // Get all events
    public List<EventEntity> getAllEvent() {
        return eventRepo.findAll();
    }

    // Get by ID
    public EventEntity getEventById(int id) {
        return eventRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Event not found"));
    }

    // Update Event by ID
    public EventEntity updateEvent(int eventID, EventEntity updatedEvent) {
        EventEntity eventEntity = eventRepo.findById(eventID).orElseThrow(() -> new NoSuchElementException("Event not found"));
        
        eventEntity.setTitle(updatedEvent.getTitle());
        eventEntity.setDescription(updatedEvent.getDescription());
        eventEntity.setStartTime(updatedEvent.getStartTime());
        eventEntity.setEndTime(updatedEvent.getEndTime());
        eventEntity.setLocation(updatedEvent.getLocation());
        eventEntity.setMaxCapacity(updatedEvent.getMaxCapacity());
        
        return eventRepo.save(eventEntity);
    }

    // Delete by ID
    public String deleteEvent(int eventID) {
        eventRepo.findById(eventID).orElseThrow(() -> new NoSuchElementException("Event not found"));
        eventRepo.deleteById(eventID);
        return "Event record successfully deleted!";
    }
}
