package com.example.backend.service;

import com.example.backend.model.http.res.ImageUploadResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageUploadService {

    public static final URI endpoint;

    static {
        try {
            endpoint = new URI("http://82.66.240.161:8090/files");
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    public ImageUploadResponse upload(MultipartFile file) throws IOException {
        var request = HttpRequest.newBuilder(endpoint)
            .header("Content-Type", "application/octet-stream")
            .header("X-File-Ext", getFileExtension(file.getOriginalFilename()))
            .POST(BodyPublishers.ofByteArray(file.getBytes()))
            .build();

        HttpResponse<String> response = sendRequest(request);
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(response.body(), ImageUploadResponse.class);
    }

    private HttpResponse<String> sendRequest(HttpRequest request)
        throws IOException {
        try (var client = HttpClient.newHttpClient()) {
            try {
                return client.send(request, BodyHandlers.ofString());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        return null;
    }

    private String getFileExtension(String filename) {
        if (filename == null) {
            return null;
        }
        int dotIndex = filename.lastIndexOf(".");
        if (dotIndex >= 0) {
            return filename.substring(dotIndex + 1);
        }
        return "";
    }

    public HttpResponse<String> delete(String url)
        throws IllegalArgumentException, IOException {
        if (!url.startsWith(endpoint.toString())) {
            throw new IllegalArgumentException(
                "Invalid base URL, should start with " + endpoint
            );
        }

        var request = HttpRequest.newBuilder(endpoint.resolve(url))
            .DELETE()
            .build();

        return sendRequest(request);
    }
}
