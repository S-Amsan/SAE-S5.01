package com.example.backend.model.http.req;

import jakarta.validation.constraints.*;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class DonationPublishRequest {

    @NotNull
    @NotBlank
    private String slug;

    @NotNull
    @NotBlank
    private String title;

    @NotNull
    @NotBlank
    private String fullTitle;

    @NotNull
    @NotBlank
    private String description;

    @NotNull
    @NotBlank
    private String fullDescription;

    @NotNull
    private Integer points;

    @NotNull
    private MultipartFile image;

    @NotNull
    private MultipartFile cardImage;

    @NotNull
    private MultipartFile bannerImage;

    @NotNull
    private Long partnerId;

    @NotNull
    @NotBlank
    private String type;
}
