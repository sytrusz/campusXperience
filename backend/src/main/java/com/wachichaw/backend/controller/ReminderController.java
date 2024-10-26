package com.wachichaw.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.wachichaw.backend.entity.ReminderEntity;
import com.wachichaw.backend.service.ReminderService;

@RestController
@RequestMapping("/reminder")
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

    // Get all
    @GetMapping("/getAll")
    public List<ReminderEntity> getAllReminder() {
        return reminderService.getAllReminder();
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
