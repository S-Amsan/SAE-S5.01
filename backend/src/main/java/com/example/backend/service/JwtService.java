package com.example.backend.service;

import com.example.backend.model.security.UserDetails;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private static final String CLAIM_USERID = "userId";

    @Value("${jwt.privatekey}")
    private String privateKey;

    @Value("${jwt.durationms}")
    private Long tokenDuration;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    public String generateToken(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        long currentTimeMillis = System.currentTimeMillis();
        Date issuedDate = new Date(currentTimeMillis);
        Date expireDate = new Date(currentTimeMillis + tokenDuration);

        return Jwts.builder()
            .claim(CLAIM_USERID, (UserDetails) authentication.getPrincipal())
            .setIssuedAt(issuedDate)
            .setExpiration(expireDate)
            .signWith(getKeySigner(), SignatureAlgorithm.HS256)
            .compact();
    }

    private SecretKey getKeySigner() {
        return Keys.hmacShaKeyFor(privateKey.getBytes());
    }

    public UserDetails tryVerifyJwt(String token) {
        Long userId = ((Number) Jwts.parserBuilder()
                .setSigningKey(getKeySigner())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get(CLAIM_USERID)).longValue();

        return new UserDetails(userService.getUserById(userId));
    }
}
