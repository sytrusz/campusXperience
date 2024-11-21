package com.wachichaw.backend.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wachichaw.backend.repository.EventRepo;
import com.wachichaw.backend.repository.RsvpRepo;
import com.wachichaw.backend.repository.UserRepo;
import com.wachichaw.backend.entity.EventEntity;
import com.wachichaw.backend.entity.RsvpEntity;
import com.wachichaw.backend.entity.UserEntity;

@Service
public class RsvpService {
    @Autowired
    private RsvpRepo rsvpRepo;
    @Autowired
    private EventRepo eventRepository;
   
    @Autowired
    private UserRepo userRepository;

    // Read All Reservation
    public List<RsvpEntity> getAllReservations(){
        return rsvpRepo.findAll();
    }

    // Saving The Data of Reservation
    public RsvpEntity saveReservation(RsvpEntity rsvp) {
        EventEntity event = eventRepository.findById(rsvp.getEvent().getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + rsvp.getEvent().getEventId()));
        UserEntity user = userRepository.findById(rsvp.getUser().getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + rsvp.getUser().getUserId()));
    
                rsvp.setEvent(event);
                rsvp.setUser(user);
    
        return rsvpRepo.save(rsvp);
    }
    

    // Delelting The Reservation
    public String deleteReservation(int rsvp_id){
        String msg = " ";
        if (rsvpRepo.findById(rsvp_id) != null){
            rsvpRepo.deleteById(rsvp_id);
            msg = "Reservation has successfully deleted!";
        }
        return msg;
    }

    // Updating The Data of Reservation
    @SuppressWarnings("finally")
    public RsvpEntity updateReservation(int rsvp_id, RsvpEntity updateReservation){
        RsvpEntity rsvpEntity = new RsvpEntity();
        try{
            rsvpEntity = rsvpRepo.findById(rsvp_id).get();
            rsvpEntity.setStatus(updateReservation.getStatus());
            rsvpEntity.setRsvpTime(updateReservation.getRsvpTime());
        } catch (NoSuchElementException nex) {
            throw new Exception("Reservation " + rsvp_id + "not found!");
        } finally{
            return rsvpRepo.save(rsvpEntity);
        }
    }
}
