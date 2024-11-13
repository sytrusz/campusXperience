package com.wachichaw.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wachichaw.backend.entity.RsvpEntity;
import com.wachichaw.backend.service.RsvpService;

@RestController
@CrossOrigin
@RequestMapping("/rsvp")
public class RsvpController {
    @Autowired
    RsvpService rsvpService;

    // Printing A Message
    @GetMapping("/print")
    public String print(){
        return "I miss you!";
    }

    // "CREATE" a Data to The Repository
    @PostMapping("/save")
    public RsvpEntity saveReservation(@RequestBody RsvpEntity rsvp){
        return rsvpService.saveReservation(rsvp);
    }

    // "READ" All The Data That Is Already Created
    @GetMapping("/getAll")
    public List<RsvpEntity> getAllReservations(){
        return rsvpService.getAllReservations();
    }

    // "UPDATE" A Data By ID
    @PutMapping("/update/{rsvp_id}")
    public RsvpEntity updateReservation(@PathVariable int rsvp_id, @RequestBody RsvpEntity rsvp){
        return rsvpService.updateReservation(rsvp_id, rsvp);
    }

    // "DELETE" a Data By ID
    @DeleteMapping("/delete/{rsvp_id}")
    public String deleteReservation(@PathVariable int rsvp_id){
        return rsvpService.deleteReservation(rsvp_id);
    }
}
