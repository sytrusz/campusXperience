package com.wachichaw.backend.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wachichaw.backend.repository.EventRepo;
import com.wachichaw.backend.repository.RsvpRepo;
import com.wachichaw.backend.repository.UserRepo;
import com.wachichaw.backend.entity.EventEntity;
import com.wachichaw.backend.entity.RsvpEntity;
import com.wachichaw.backend.entity.UserEntity;

import lombok.RequiredArgsConstructor;
// import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class RsvpService {
    @Autowired
    private RsvpRepo rsvpRepo;
    @Autowired
    private EventRepo eventRepository;
   
    @Autowired
    private UserRepo userRepository;

    private final EmailService emailService;

    public void handleRsvp(String userEmail, String eventDetails) {
        // Example logic for RSVP handling
        String subject = "Event Ticket Confirmation";
        String body = "Thank you for reserving your spot!\n\nEvent Details:\n" + eventDetails;

        // Send email
        emailService.sendEmail(userEmail, subject, body);
    }

    // Read All Reservation
    public List<RsvpEntity> getAllReservations(){
        return rsvpRepo.findAll();
    }
    public List<RsvpEntity> getReservationsByUserId(int userId) {
        return rsvpRepo.findByUser_UserId(userId);
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
    public String deleteReservation(int rsvp_id) {
        Optional<RsvpEntity> rsvp = rsvpRepo.findById(rsvp_id);
        if (rsvp.isPresent()) {
            rsvpRepo.deleteById(rsvp_id);
            return "Reservation has successfully deleted!";
        } else {
            return "Reservation with ID " + rsvp_id + " not found!";
        }
    }
    

    // Updating The Data of Reservation
    public RsvpEntity updateReservation(int rsvp_id, RsvpEntity updateReservation) {
        RsvpEntity rsvpEntity = rsvpRepo.findById(rsvp_id)
                .orElseThrow(() -> new RuntimeException("Reservation " + rsvp_id + " not found!"));
        
        rsvpEntity.setStatus(updateReservation.getStatus());
        rsvpEntity.setRsvpTime(updateReservation.getRsvpTime());
        
        return rsvpRepo.save(rsvpEntity);
    }
}
