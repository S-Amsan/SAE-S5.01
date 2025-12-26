package com.example.backend.model.http.req;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PostPublishRequest {

    @NotNull
    @NotBlank(message = "Name is required")
    private String name;

    @NotNull
    @NotBlank(message = "Address is required")
    private String address;

    @NotNull
    @NotBlank(message = "Description is required")
    private String description;

    @NotNull
    private MultipartFile image;
}
