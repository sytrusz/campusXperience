package com.wachichaw.backend.entity;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Reservation")
public class RsvpEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rsvpId;

    @ManyToOne
    @JoinColumn(name = "eventId")
    private EventEntity event;

    @ManyToOne
    @JoinColumn(name = "userId")
    private UserEntity user;

    @Column(name = "status")
    private String status;

    @Column(name = "reservationTime")
    private LocalDateTime rsvpTime;

    public RsvpEntity(){

    }

    public RsvpEntity(int rsvpId, EventEntity event, UserEntity user, String status, LocalDateTime rsvpTime){
        this.rsvpId = rsvpId;
        this.event = event;
        this.user = user;
        this.status = status;
        this.rsvpTime = rsvpTime;
    }

    public int getReservationId(){
        return rsvpId;
    }

    public void setRsvpId(int rsvpId){
        this.rsvpId = rsvpId;
    }

    public EventEntity getEvent(){
        return event;
    }

    public void setEvent(EventEntity event){
        this.event = event;
    }

    public UserEntity getUser(){
        return user;
    }

    public void setUser(UserEntity user){
        this.user = user;
    }

    public String getStatus(){
        return status;
    }

    public void setStatus(String status){
        this.status = status;
    }

    public LocalDateTime getReservationTime(){
        return rsvpTime;
    }

    public void setReservationTime(LocalDateTime rsvpTime){
        this.rsvpTime = rsvpTime;
    }
}
