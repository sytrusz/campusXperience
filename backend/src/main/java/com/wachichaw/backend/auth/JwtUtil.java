package com.wachichaw.backend.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import com.wachichaw.backend.entity.UserEntity;
import com.wachichaw.backend.entity.AdminUserEntity;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.security.Key;

@Component
public class JwtUtil {
    private Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Generates a secure key
    private long expirationTime = 1000 * 60 * 60; // 1 hour

    // Generate token for UserEntity without role attribute
    public String generateToken(UserEntity user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail());
        claims.put("username", user.getName());
        return createToken(claims, String.valueOf(user.getUserId()));
    }

    // Generate token for AdminUserEntity with role attribute
    public String generateToken(AdminUserEntity admin) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", admin.getEmail());
        claims.put("username", admin.getName());
        claims.put("role", admin.getRole()); // Specify admin role
        return createToken(claims, String.valueOf(admin.getadminId()));
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(secretKey)
                .compact();
    }

    public String extractUserId(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
    }

    public String extractUsername(String token) {
        return (String) extractAllClaims(token).get("username");
    }

    public String extractRole(String token) {
        return (String) extractAllClaims(token).get("role");
    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    public boolean validateToken(String token, String userId) {
        final String extractedUserId = extractUserId(token);
        return (extractedUserId.equals(userId) && !isTokenExpired(token));
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
    }
}
