package com.example.backend.service.security;

import com.example.backend.model.security.MyUserDetails;
import com.example.backend.service.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private static final String CLAIM_USERID = "userId";

    @Value("${jwt.privatekey}")
    private String privateKey;

    @Value("${jwt.durationms}")
    private Long tokenDuration;

    @Autowired
    private UserService userService;

    public String generateToken(String email) {
        long currentTimeMillis = System.currentTimeMillis();
        Date issuedDate = new Date(currentTimeMillis);
        Date expireDate = new Date(currentTimeMillis + tokenDuration);

        return Jwts.builder()
            .setIssuedAt(issuedDate)
            .setExpiration(expireDate)
            .signWith(getKeySigner(), SignatureAlgorithm.HS256)
            .setSubject(email)
            .compact();
    }

    private SecretKey getKeySigner() {
        return Keys.hmacShaKeyFor(privateKey.getBytes());
    }

    public MyUserDetails tryVerifyJwt(String token) {
        Long userId = ((Number) Jwts.parserBuilder()
                .setSigningKey(getKeySigner())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get(CLAIM_USERID)).longValue();

        return new MyUserDetails(userService.getUserById(userId));
    }
}
