package com.example.backend.model.http.req;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class DocumentPublishRequest {

    @NotNull
    private Long cardId;

    @NotNull
    private MultipartFile file;
}
