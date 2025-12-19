package com.example.backend.model.security;

import com.example.backend.model.User;
import com.example.backend.repository.HashSaltRepository;
import java.util.Collection;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;

@RequiredArgsConstructor
public class UserDetails
    implements org.springframework.security.core.userdetails.UserDetails {

    @Autowired
    private HashSaltRepository hashSaltRepository;

    private final User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return hashSaltRepository.findByUserId(user.getId()).get().getHash();
    }

    @Override
    public String getUsername() {
        return user.getPseudo();
    }
}
