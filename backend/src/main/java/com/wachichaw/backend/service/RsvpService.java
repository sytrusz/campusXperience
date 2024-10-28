package com.wachichaw.backend.service;

// import org.hibernate.mapping.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wachichaw.backend.entity.RsvpEntity;
import com.wachichaw.backend.repository.RsvpRepo;
import java.util.List;

@Service
public class RsvpService  {
    @Autowired
    private RsvpRepo rsvpRepo;

    // Read all the reservaiton
    public List<RsvpEntity> getAllReservations(){
        return rsvpRepo.findAll();
    }

    // Saving a Reservation
    public RsvpEntity saveReservation(RsvpEntity rsvp){
        return rsvpRepo.save(rsvp);
    }

    // Delete the reservation
    public String deleteReservation(int rsvpId){
        String msg = " ";
        if (rsvpRepo.findById(rsvpId) != null){
            rsvpRepo.deleteById(rsvpId);
            msg = "Reservation has successfully deleted!";
        }
        return msg;
    }

    // Update
    @SuppressWarnings("finally")
    public RsvpEntity updateReservation(int rsvpId, RsvpEntity updatedReservation){
        RsvpEntity rsvpEntity = new RsvpEntity();

        try{
            rsvpEntity = rsvpRepo.findById(rsvpId).get();
            rsvpEntity.setStatus(updatedReservation.getStatus());
            rsvpEntity.setReservationTime(updatedReservation.getReservationTime());
        } catch(NoSuchElementException nex){
            throw new Exception("Reservation " + rsvpId + " not found");
        } finally{
            return rsvpRepo.save(rsvpEntity);
        }
    }
}
