package com.college.placement.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * JWT Token Provider
 * Generates and validates JWT tokens for students and admin
 */
@Component
public class JwtTokenProvider {

    @Value("${jwt.secret:404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970}")
    private String jwtSecret;

    @Value("${jwt.expiration:86400000}")
    private long jwtExpiration;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Generate JWT token for any user (unified)
     * 
     * @param identifier User identifier (e.g., email or register number)
     * @param role       User role (STUDENT, ADMIN, HOD, etc.)
     * @return JWT token
     */
    public String generateToken(String identifier, String role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        // Optionally add identifier as a separate claim if needed, though it's already
        // the subject
        // claims.put("identifier", identifier);

        return Jwts.builder()
                .subject(identifier) // The primary identifier for the token
                .claims(claims) // Add custom claims like role
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Legacy method for backward compatibility
     * Generate token for student (using register number)
     */
    public String generateTokenForStudent(String registerNumber) {
        return generateToken(registerNumber, "STUDENT");
    }

    /**
     * Legacy method for backward compatibility
     * Generate token for admin (using email)
     */
    public String generateTokenForAdmin(String email) {
        return generateToken(email, "ADMIN");
    }

    /**
     * Get identifier (register number or email) from token
     */
    public String getIdentifierFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }

    /**
     * Get role from token
     */
    public String getRoleFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.get("role", String.class);
    }

    /**
     * Validate JWT token
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (SecurityException ex) {
            throw new RuntimeException("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            throw new RuntimeException("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            throw new RuntimeException("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            throw new RuntimeException("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            throw new RuntimeException("JWT claims string is empty");
        }
    }
}
