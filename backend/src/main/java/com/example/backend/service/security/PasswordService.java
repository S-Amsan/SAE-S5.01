package com.example.backend.service.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

    private final SecureRandom random;

    public PasswordService() {
        this.random = new SecureRandom();
    }

    public HashSalt generate(String password) {
        String salt = generateSalt();
        String hashedPassword = hashPassword(password, salt);
        return new HashSalt(hashedPassword, salt);
    }

    public synchronized String generateSalt() {
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    public String hashPassword(String password, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(Base64.getDecoder().decode(salt));
            byte[] hashedPassword = md.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hashedPassword);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }

    public boolean verifyPassword(
        String password,
        String salt,
        String storedHash
    ) {
        String computedHash = hashPassword(password, salt);
        return storedHash.equals(computedHash);
    }

    public static class HashSalt {

        private final String salt;
        private final String hash;

        public HashSalt(String salt, String hash) {
            this.salt = salt;
            this.hash = hash;
        }

        public String getSalt() {
            return salt;
        }

        public String getHash() {
            return hash;
        }
    }
}
