package com.example.backend.model.http.req;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AccountUpdateRequest {

    @Nullable
    @Size(
        min = 3,
        message = "Username not valid, please enter at least {min} characters"
    )
    private String pseudo;

    @Nullable
    @Email(message = "Email not valid")
    private String email;

    @Nullable
    @Size(
        min = 4,
        message = "Name not valid, please enter at least {min} characters"
    )
    private String name;

    @Nullable
    @Size(
        min = 8,
        message = "Password not valid, please enter at least {min} characters"
    )
    private String password;

    // TODO: Add validation
    @Nullable
    private String phone;

    @Nullable
    @Min(13)
    @Max(120)
    private Integer age;

    @Nullable
    private MultipartFile avatarImage;
}
