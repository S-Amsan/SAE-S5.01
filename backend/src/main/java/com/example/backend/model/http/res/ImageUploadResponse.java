package com.example.backend.model.http.res;

import lombok.Data;

@Data
public class ImageUploadResponse {

    private String filename;
    private String url;
    private String sha256;
    private String error;
    private int size;
}
