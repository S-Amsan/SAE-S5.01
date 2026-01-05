package com.example.backend.service;

import com.example.backend.model.Post;
import com.example.backend.model.User;
import com.example.backend.model.http.req.PostPublishRequest;
import com.example.backend.repository.PostRepository;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    private ImageUploadService imageUploadService;

    @Autowired
    private PostRepository postRepository;

    public Post publish(PostPublishRequest request, User user)
        throws IOException {
        var response = imageUploadService.upload(request.getImage());

        if (response.getError() != null) {
            throw new RuntimeException(
                "Error uploading post image: " + response.getError()
            );
        }

        Post post = new Post();

        post.setUser(user);
        post.setName(request.getName());
        post.setDescription(request.getDescription());
        post.setAddress(request.getAddress());
        post.setImageUrl(
            ImageUploadService.endpoint.toString() +
                '/' +
                response.getFilename()
        );

        return postRepository.save(post);
    }
}
