package com.wachichaw.backend.service;
 
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import com.wachichaw.backend.entity.EventEntity;
import com.wachichaw.backend.entity.ReminderEntity;
import com.wachichaw.backend.entity.UserEntity;
import com.wachichaw.backend.repository.ReminderRepo;
import com.wachichaw.backend.repository.EventRepo;
import com.wachichaw.backend.repository.UserRepo;
import java.util.NoSuchElementException;
 
@Service
public class ReminderService {
    @Autowired
    private ReminderRepo reminderRepo;
   
    @Autowired
    private EventRepo eventRepository;
   
    @Autowired
    private UserRepo userRepository;
 
    public ReminderService() {
        super();
    }
 
    // Create
    public ReminderEntity saveReminder(ReminderEntity reminder) {
       
        EventEntity event = eventRepository.findById(reminder.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));
        UserEntity user = userRepository.findById(reminder.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
 
        reminder.setEvent(event);
        reminder.setUser(user);  
        return reminderRepo.save(reminder);
    }
 
    // Get all
    public List<ReminderEntity> getAllReminders() {
        return reminderRepo.findAll();
    }
 
    // Get by ID
    public Optional<ReminderEntity> getReminderById(int id) {
        return reminderRepo.findById(id);
    }
 
    // Update by ID
    public ReminderEntity updateReminder(int id, ReminderEntity updatedReminder) {
        ReminderEntity existingReminder = reminderRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Reminder " + id + " not found"));
       
        // Fetch Event and User before updating
        EventEntity event = eventRepository.findById(updatedReminder.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));
        UserEntity user = userRepository.findById(updatedReminder.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
 
        existingReminder.setEvent(event);
        existingReminder.setUser(user);
        existingReminder.setReminderTime(updatedReminder.getReminderTime());
        existingReminder.setReminderType(updatedReminder.getReminderType());
 
        return reminderRepo.save(existingReminder);
    }
 
    // Delete by ID
    @SuppressWarnings("unused")
    public String deleteReminder(int id) {
        if (reminderRepo.existsById(id)) {
            reminderRepo.deleteById(id);
            return "Reminder record successfully deleted!";
        } else {
            return "Reminder with ID " + id + " not found!";
        }
    }
 
    // Get event ID from reminder
    public Integer getEventIdFromReminder(int reminderId) {
        ReminderEntity reminder = reminderRepo.findById(reminderId)
                .orElseThrow(() -> new NoSuchElementException("Reminder not found"));
        return reminder.getEventId();
    }
 
    // Get user ID from reminder
    public Integer getUserIdFromReminder(int reminderId) {
        ReminderEntity reminder = reminderRepo.findById(reminderId)
                .orElseThrow(() -> new NoSuchElementException("Reminder not found"));
        return reminder.getUserId();
    }
}
 