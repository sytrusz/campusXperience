package com.wachichaw.backend.controller;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
 
import com.wachichaw.backend.entity.ReminderEntity;
import com.wachichaw.backend.service.ReminderService;
 
@RestController
@RequestMapping("/reminder")
@CrossOrigin(origins = "http://localhost:5173")
public class ReminderController {
 
    @Autowired
    private ReminderService reminderService;
 
    // Check
    @GetMapping("/print")
    public String print() {
        return "Hello, Reminder! Test";
    }
 
    // Create
    @PostMapping("/save")
    public ReminderEntity saveReminder(@RequestBody ReminderEntity reminder) {
        return reminderService.saveReminder(reminder);
    }
 
    // Read
    @GetMapping("/getAll")
    public List<ReminderEntity> getAllReminders() {
        return reminderService.getAllReminders();
    }
 
    // Update by ID
    @PutMapping("/update")
    public ReminderEntity updateReminder(@RequestParam int reminderId, @RequestBody ReminderEntity reminder) {
        return reminderService.updateReminder(reminderId, reminder);
    }
 
    // Delete by ID
    @DeleteMapping("/delete/{reminderId}")
    public String deleteReminder(@PathVariable int reminderId){
        return reminderService.deleteReminder(reminderId);
    }
}
 