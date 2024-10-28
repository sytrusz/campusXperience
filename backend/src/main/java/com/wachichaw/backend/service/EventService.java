package com.wachichaw.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wachichaw.backend.entity.EventEntity;
import com.wachichaw.backend.repository.EventRepo;

@Service
public class EventService {
    
    @Autowired
    private EventRepo eventRepo;

    public EventService(){
        super();
    }

    // Create
    public EventEntity saveEvent(EventEntity event) {
        return eventRepo.save(event);
    }


    // Get all
    public List<EventEntity> getAllEvent() {
        return eventRepo.findAll();
    }

    // Get by ID
    public Optional<EventEntity> getEventById(int id) {
        return eventRepo.findById(id);
    }

    // Update by ID
    @SuppressWarnings("finally")
    public EventEntity updateEvent(int eventID, EventEntity updatedEvent) {
        EventEntity eventEntity = new EventEntity();

        try{
            eventEntity = eventRepo.findById(eventID).get();
            
            eventEntity.setTitle(updatedEvent.getTitle());
            eventEntity.setDescription(updatedEvent.getDescription());
            eventEntity.setStartTime(updatedEvent.getStartTime());
            eventEntity.setEndTime(updatedEvent.getEndTime());
            eventEntity.setLocation(updatedEvent.getLocation());
            eventEntity.setMaxCapacity(updatedEvent.getMaxCapacity());
        }catch(NoSuchElementException nex){
            throw new Exception ("Event " + eventID + " not found");
        }finally{
            return eventRepo.save(eventEntity);
        }
    }

    // Delete by ID
    public String deleteEvent(int eventID) {
        String msg = " ";
        if (eventRepo.findById(eventID)!=null){
            eventRepo.deleteById(eventID);
            msg = "Event record successfully deleted!";
        }else
            msg = eventID + "NOT FOUND!";
        return msg;
    }
}