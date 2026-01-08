package com.example.backend.service;

import com.example.backend.model.Card;
import com.example.backend.model.User;
import com.example.backend.model.document.Document;
import com.example.backend.model.http.req.DocumentPublishRequest;
import com.example.backend.repository.CardRepository;
import com.example.backend.repository.DocumentRepository;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private CardRepository cardRepository;

    public Document upload(DocumentPublishRequest request, User user)
        throws IOException {
        var response = fileUploadService.upload(request.getFile());

        if (response.getError() != null) {
            throw new RuntimeException(
                "Error uploading document file: " + response.getError()
            );
        }

        Card card = cardRepository.findById(request.getCardId()).orElseThrow();

        Document document = new Document();
        document.setUser(user);
        document.setCard(card);
        document.setFileUrl(
            FileUploadService.endpoint.toString() + '/' + response.getFilename()
        );

        return documentRepository.save(document);
    }
}
