package com.example.backend.model.http.res;

import lombok.Data;

@Data
public class FileUploadResponse {

    private String filename;
    private String url;
    private String sha256;
    private String error;
    private int size;
}
