package com.example.backend.service;

import com.example.backend.model.partner.Partner;
import com.example.backend.repository.PartnerRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PartnerService {

    @Autowired
    private PartnerRepository partnerRepository;

    public List<Partner> getAll() {
        return partnerRepository.findAll();
    }

    public Optional<Partner> getById(Long id) {
        return partnerRepository.findById(id);
    }
}
