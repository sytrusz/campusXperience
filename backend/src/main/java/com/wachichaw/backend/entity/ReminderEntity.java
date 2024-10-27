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
@Table(name = "Reminder")
public class ReminderEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reminder_id")
    private int reminderId;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private EventEntity event;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "reminder_time")
    private LocalDateTime reminderTime;

    @Column(name = "reminder_type")
    private String reminderType;


    public ReminderEntity() {
    }


    public ReminderEntity(int reminderId, EventEntity event, UserEntity user, LocalDateTime reminderTime, String reminderType){
        super();
        this.reminderId = reminderId;
        this.event = event;
        this.user = user;
        this.reminderTime = reminderTime;
        this.reminderType = reminderType;
    }

    public int getReminderId(){
        return reminderId;
    }

    public void setReminderId(int reminderId){
        this.reminderId = reminderId;
    }

    public EventEntity getEventId(){
        return event;
    }

    public void setEventId(EventEntity eventId){
        this.event = eventId;
    }

    public UserEntity getUserId(){
        return user;
    }

    public void setUserId(UserEntity userId){
        this.user = userId;
    }

    public LocalDateTime getReminderTime(){
        return reminderTime;
    }

    public void setReminderTime(LocalDateTime reminderTime){
        this.reminderTime = reminderTime;
    }

    public String getReminderType(){
        return reminderType;
    }
    public void setReminderType(String reminderType){
        this.reminderType = reminderType;
    }
}
