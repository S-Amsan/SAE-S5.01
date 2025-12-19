package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz ->
                authz
                    .requestMatchers("/api/auth/**")
                    .permitAll()
                    .requestMatchers("/users")
                    .permitAll()
                    .requestMatchers("/update")
                    .authenticated()
            )
            .csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }
}
