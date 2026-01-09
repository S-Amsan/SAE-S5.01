package com.example.backend.service;

import com.example.backend.model.Card;
import com.example.backend.model.http.req.CardPublishRequest;
import com.example.backend.model.http.res.FileUploadResponse;
import com.example.backend.repository.CardRepository;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private FileUploadService fileUploadService;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    public Card getCardById(Long id) {
        return cardRepository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("Card not found"));
    }

    public Card publish(CardPublishRequest request) {
        Card card = new Card();
        card.setTitle(request.getTitle());
        card.setDescription(request.getDescription());

        FileUploadResponse fileUploadResponse;

        try {
            fileUploadResponse = fileUploadService.upload(request.getPhoto());
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload card photo", e);
        }

        card.setPhotoUrl(
            FileUploadService.endpoint.toString() +
                '/' +
                fileUploadResponse.getFilename()
        );
        card.setTrophies(request.getTrophies());
        return cardRepository.save(card);
    }
}
