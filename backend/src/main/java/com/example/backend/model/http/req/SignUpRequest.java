package com.example.backend.model.http.req;

import jakarta.validation.constraints.*;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class SignUpRequest {

    @Size(
        min = 3,
        message = "Username not valid, please enter at least {min} characters"
    )
    @NotBlank(message = "Username must not be blank")
    @NotNull(message = "Username is required")
    private String pseudo;

    @Email(message = "Email not valid")
    @NotNull(message = "Email is required")
    private String email;

    @Size(
        min = 4,
        message = "Name not valid, please enter at least {min} characters"
    )
    @NotBlank(message = "Name must not be blank")
    @NotNull(message = "Name is required")
    private String name;

    @Size(
        min = 8,
        message = "Password not valid, please enter at least {min} characters"
    )
    @NotBlank(message = "Password must not be blank")
    @NotNull(message = "Password is required")
    private String password;

    // TODO: Add validation
    private String phone;

    @Min(13)
    @Max(120)
    private Integer age;

    private MultipartFile avatarImage;
}
