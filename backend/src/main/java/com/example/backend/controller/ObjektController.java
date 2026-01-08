package com.example.backend.controller;

import com.example.backend.model.Objekt;
import com.example.backend.model.http.req.ObjektPostRequest;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.repository.ObjektRepository;
import com.example.backend.service.ImageUploadService;
import jakarta.validation.Valid;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/object")
public class ObjektController {

    @Autowired
    private ImageUploadService imageUploadService;

    @Autowired
    private ObjektRepository objektRepository;

    @PostMapping("/post")
    public ResponseEntity<Objekt> post(
        @Valid ObjektPostRequest request,
        @AuthenticationPrincipal MyUserDetails userDetails
    ) throws IOException {
        var response = imageUploadService.upload(request.getImage());

        if (response.getError() != null) {
            throw new RuntimeException(
                "Error uploading post image: " + response.getError()
            );
        }

        Objekt object = new Objekt();

        object.setUser(userDetails.getUser());
        object.setTitle(request.getTitle());
        object.setDescription(request.getDescription());
        object.setAddress(request.getAddress());
        object.setPickedUp(false);
        object.setPhotoUrl(
            ImageUploadService.endpoint.toString() +
                '/' +
                response.getFilename()
        );

        return ResponseEntity.ok(objektRepository.save(object));
    }

    @GetMapping("/all")
    public List<Objekt> getAll() {
        return objektRepository.findAll();
    }
}
