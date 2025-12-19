package com.example.backend.security;

import com.example.backend.model.security.UserDetails;
import com.example.backend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        String token = readToken(request);

        if (token != null) {
            // Verify the JWT if one is provided
            final UserDetails details = jwtService.tryVerifyJwt(token);

            // Tell spring the authentication is valid if no exception was thrown
            SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                    details,
                    null,
                    details.getAuthorities()
                )
            );
        }

        // Resume request filtering
        filterChain.doFilter(request, response);
    }

    private String readToken(HttpServletRequest request) {
        final String tokenPrefix = "Bearer ";
        final String value = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (value == null || !value.startsWith(tokenPrefix)) {
            return null;
        }

        return value.substring(tokenPrefix.length());
    }
}
