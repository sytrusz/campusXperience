package com.wachichaw.backend.service;

import java.util.Optional;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wachichaw.backend.auth.JwtUtil;
import com.wachichaw.backend.entity.AdminUserEntity;
import com.wachichaw.backend.repository.AdminUserRepo;

@Service
public class AdminUserService {
    @Autowired
    private AdminUserRepo adminUserRepo;
    @Autowired
    private JwtUtil jwtUtil;


    public AdminUserService(){
        super();
    }

    // Create
    public AdminUserEntity saveAdmin(AdminUserEntity admin) {
        return adminUserRepo.save(admin);
    }

    //Read
    public String authenticateAdmin(String email, String password) {
        System.out.println("Authenticating admin with email: " + email); 
        AdminUserEntity admin = adminUserRepo.findByEmail(email); 
    
        if (admin != null) {
            System.out.println("Admin found: " + admin.getEmail()); 
            if (admin.getPassword().equals(password)) { 
                System.out.println("Password is correct. Generating token."); 
                String token = jwtUtil.generateToken(admin); 
                System.out.println(token);
                return token;
            } else {
                System.out.println("Invalid credentials: password does not match."); 
                throw new RuntimeException("Invalid credentials"); 
            }
        } else {
            System.out.println("Admin not found with email: " + email); 
            throw new RuntimeException("Admin not found"); 
        }
    }
    // Get all
    public List<AdminUserEntity> getAllAdmin() {
        return adminUserRepo.findAll();
    }

    // Get by ID
    public Optional<AdminUserEntity> getAdminById(int id) {
        return adminUserRepo.findById(id);
    }

    // Update by ID
    @SuppressWarnings("finally")
    public AdminUserEntity updateAdmin(int id, AdminUserEntity updatedAdmin) {
        AdminUserEntity AdminUserEntity = new AdminUserEntity();

        try{
            AdminUserEntity = adminUserRepo.findById(id).get();
            
            AdminUserEntity.setName(updatedAdmin.getName());
            AdminUserEntity.setEmail(updatedAdmin.getEmail());
            AdminUserEntity.setPassword(updatedAdmin.getPassword());
        }catch(NoSuchElementException nex){
            throw new Exception ("Admin " + id + " not found");
        }finally{
            return adminUserRepo.save(AdminUserEntity);
        }
    }

    // Delete by ID
    @SuppressWarnings("unused")
    public String deleteAdmin(int id) {
        String msg = " ";
        if (adminUserRepo.findById(id)!=null){
            adminUserRepo.deleteById(id);
            msg = "Admin record successfully deleted!";
        }else
            msg = id + "NOT FOUND!";
        return msg;
    }
}
