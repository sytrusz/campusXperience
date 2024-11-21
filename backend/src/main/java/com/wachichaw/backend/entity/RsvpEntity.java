package com.wachichaw.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "Reservation")
public class RsvpEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rsvp_id;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private EventEntity event;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "status")
    private String status;

    @Column (name = "reservation_time")
    private LocalDateTime rsvp_time;

    public RsvpEntity(){}

    public RsvpEntity(int rsvp_id, EventEntity event, UserEntity user, String status, LocalDateTime rsvp_time){
        this.rsvp_id = rsvp_id;
        this.event = event;
        this.user = user;
        this.status = status;
        this.rsvp_time = LocalDateTime.now();    
    }

    // Reservation ID
    public int getReservationId(){
        return rsvp_id;
    }
    public void setReservationId(int rsvp_id){
        this.rsvp_id = rsvp_id;
    }

    // Event Entity
    public EventEntity getEvent(){
        return event;
    }
    public void setEvent(EventEntity event){
        this.event = event;
    }

    // User Entity
    public UserEntity getUser(){
        return user;
    }
    public void setUser(UserEntity user){
        this.user = user;
    }

    // Status
    public String getStatus(){
        return status;
    }
    public void setStatus(String status){
        this.status = status;
    }

    // Local Date Time
    public LocalDateTime getRsvpTime() {
        return rsvp_time;
    }
    
    public void setRsvpTime(LocalDateTime rsvp_time) {
        this.rsvp_time = rsvp_time;
    }
    public Integer getEventId() {
        return event != null ? event.getEventId() : null;
    }
 
    public Integer getUserId() {
        return user != null ? user.getUserId() : null;
    }
}
