package com.example.backend.model.http.req;

import jakarta.validation.constraints.*;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CardPublishRequest {

    @NotNull
    @NotBlank
    private String title;

    @NotNull
    @NotBlank
    private String description;

    private Long partnerId;

    @NotNull
    private MultipartFile photo;

    @NotNull
    private Integer points;
}
