package com.example.backend.model.http.req;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class SignUpRequest {

    @Size(min = 3)
    @NotBlank
    @NotNull
    private String pseudo;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String name;

    @Size(min = 8)
    private String password;

    private String phone;

    @Min(13)
    @Max(120)
    private Integer age;

    // private MultipartFile avatarImage;
}
