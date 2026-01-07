package com.example.backend.config;

import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtFilter;
import com.example.backend.service.MyUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtFilter filter)
        throws Exception {
        http
            .cors(cors -> {})
            .authorizeHttpRequests(authz ->
                authz
                    .requestMatchers(
                        org.springframework.http.HttpMethod.OPTIONS,
                        "/**"
                    )
                    .permitAll()
                    .requestMatchers("/auth/**")
                    .permitAll()
                    .requestMatchers("/user/**")
                    .permitAll()
                    .requestMatchers("/user/stats/**")
                    .authenticated()
                    .requestMatchers("/user/notifications")
                    .authenticated()
                    .requestMatchers("/user/points/**")
                    .authenticated()
                    .requestMatchers("/user/update")
                    .authenticated()
                    .requestMatchers("/post/**")
                    .authenticated()
                    .requestMatchers("/posts")
                    .permitAll()
                    .requestMatchers("/friends/**")
                    .authenticated()
                    .requestMatchers("/donation/**")
                    .permitAll()
                    .requestMatchers("/competition/**")
                    .permitAll()
                    .requestMatchers("/competition/following")
                    .authenticated()
                    .requestMatchers("/event/**")
                    .permitAll()
                    .requestMatchers("/event/following")
                    .authenticated()
            )
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(sess ->
                sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(
                filter,
                UsernamePasswordAuthenticationFilter.class
            );
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
        AuthenticationConfiguration authenticationConfiguration
    ) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public UserDetailsService userDetailsService(UserRepository repository) {
        return new MyUserDetailsService(repository);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
