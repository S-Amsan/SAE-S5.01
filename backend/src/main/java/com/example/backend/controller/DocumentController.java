package com.example.backend.controller;

import com.example.backend.model.document.Document;
import com.example.backend.model.http.req.DocumentPublishRequest;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.repository.DocumentRepository;
import com.example.backend.service.DocumentService;
import jakarta.validation.Valid;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/document")
public class DocumentController {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<Document> uploadDocument(
        @Valid DocumentPublishRequest request,
        @AuthenticationPrincipal MyUserDetails user
    ) throws IOException {
        return ResponseEntity.ok(
            documentService.upload(request, user.getUser())
        );
    }

    @GetMapping("/all")
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }
}
