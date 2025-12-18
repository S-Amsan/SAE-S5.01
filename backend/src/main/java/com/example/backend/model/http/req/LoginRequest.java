package com.example.backend.model.http.req;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequest {

    @Email(message = "Invalid email value")
    @NotNull(message = "Email is required")
    private String email;

    @Size(min = 8, message = "Password must be at least {min} characters long")
    @NotBlank(message = "Password must not be blank")
    @NotNull(message = "Password is required")
    private String password;
}
