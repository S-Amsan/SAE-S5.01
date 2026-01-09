package com.example.backend.model.http.req;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PostReportRequest {

    @NotNull
    @NotBlank
    private String reason;
}
