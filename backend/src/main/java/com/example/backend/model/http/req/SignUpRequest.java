package com.example.backend.model.http.req;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class SignUpRequest {

    @NotBlank
    private String pseudo;

    @Email
    @NotBlank
    private String email;

    @Size(min = 8)
    private String password;

    @NotBlank
    private String phone;

    @Min(13)
    @Max(120)
    private Integer age;
}
