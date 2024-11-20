package com.wachichaw.backend.entity;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

@Entity
@Table(name = "Ticket")

public class TicketEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id")
    private int ticketId;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private EventEntity event;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
 

    @Column(name = "ticket_type", nullable = false)
    private String ticketType;

    @Column(name = "price", nullable = false)
    private String price;

    @Column(name = "purchase_time", nullable = false)
    private LocalDateTime purchaseTime;

   
    public TicketEntity(EventEntity event, UserEntity user, int ticketId, String ticketType, String price, LocalDateTime purchaseTime){
        super();
        this.event = event;
        this.user = user;
        this.ticketId = ticketId;
        this.ticketType = ticketType;
        this.price = price;
        this.purchaseTime = purchaseTime;
       
    }

    public TicketEntity() {
    }

    public int getTicketId(){
        return ticketId;
    }

    public void setTicketId(int ticketId){
        this.ticketId = ticketId;
    }

    public EventEntity getEvent(){
        return event;
    }

    public void setEventEntity(EventEntity event){
        this.event = event;
    }

    public UserEntity getUser(){
        return user;
    }

    public void setUserEntity(UserEntity user){
        this.user = user;
    }

    public String getTicketType(){
        return ticketType;
    }

    public void setTicketType(String ticketType){
        this.ticketType = ticketType;
    }

    public String getPrice(){
        return price;
    }

    public void setPrice(String price){
        this.price = price;
    }
    public LocalDateTime getPurchaseTime(){
        return purchaseTime;
    }

    public void setPurchaseTime(LocalDateTime purchaseTime){
        this.purchaseTime = purchaseTime;
    }
    public Integer getEventId() {
        return event != null ? event.getEventId() : null;
    }
 
    public Integer getUserId() {
        return user != null ? user.getUserId() : null;
    }

    
}