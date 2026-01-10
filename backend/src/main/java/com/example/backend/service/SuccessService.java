package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.success.*;
import com.example.backend.repository.success.*;
import com.example.backend.repository.success.SuccessTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SuccessService {

    @Autowired
    private SuccessTypeRepository successTypeRepository;

    @Autowired
    private SuccessRepository successRepository;

    public void onObjectPickup(User user) {
        giveSuccessTo(user, SuccessTypes.CHASSEUR);
    }

    private void giveSuccessTo(User user, SuccessTypes type) {
        SuccessType successType = successTypeRepository
            .findById(type.getId())
            .orElseThrow();
        Success success = new Success();

        success.setUser(user);
        success.setType(successType);

        successRepository.save(success);
    }

    enum SuccessTypes {
        PREMIER_PAS(1),
        SERIE_DE_FEU(2),
        LIGUES_SUPERIEURES(3),
        CHASSEUR(4),
        RECYCLEUR(5),
        GENEROSITE_VERTE(6);

        public long getId() {
            return id;
        }

        SuccessTypes(int id) {
            this.id = id;
        }

        private long id;
    }
}
