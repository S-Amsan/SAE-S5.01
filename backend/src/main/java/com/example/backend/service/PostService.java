package com.example.backend.service;

import com.example.backend.model.Objekt;
import com.example.backend.model.Post;
import com.example.backend.model.Report;
import com.example.backend.model.User;
import com.example.backend.model.http.req.PostPublishRequest;
import com.example.backend.model.http.req.PostReportRequest;
import com.example.backend.repository.ObjektRepository;
import com.example.backend.repository.PostRepository;
import com.example.backend.repository.ReportRepository;
import java.io.IOException;
import java.util.Optional;
import java.util.Set;
import java.util.function.Consumer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ActionService actionService;

    @Autowired
    private ObjektRepository objektRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ReportRepository reportRepository;

    public Post publish(PostPublishRequest request, User user)
        throws IOException {
        var response = fileUploadService.upload(request.getImage());

        if (response.getError() != null) {
            throw new RuntimeException(
                "Error uploading post image: " + response.getError()
            );
        }

        Post post = new Post();

        post.setUser(user);
        post.setName(request.getName());
        post.setDescription(request.getDescription());
        post.setImageUrl(
            FileUploadService.endpoint.toString() + '/' + response.getFilename()
        );

        Long objectId = request.getObjectId();
        if (objectId != null) {
            Objekt object = objektRepository.findById(objectId).orElseThrow();
            post.setObject(object);
        }

        return postRepository.save(post);
    }

    private void onPostReaction(Post post, User user, ReactionType type) {
        if (
            !post.getLikes().contains(user) &&
            !post.getDislikes().contains(user)
        ) {
            switch (type) {
                case LIKE:
                    post.getLikes().add(user);
                    break;
                case DISLIKE:
                    post.getDislikes().add(user);
                    break;
            }

            userService.onPostReaction(user);
            actionService.onPostReaction(post);
        }
    }

    private void maybeValidatePost(Post post) {
        if (post.getLikes().size() == 5) {
            post.setValidated(true);
        } else if (post.getDislikes().size() == 5) {
            post.setValidated(false);
        }
    }

    private ResponseEntity<Void> updatePostReactions(
        Long postId,
        User user,
        Consumer<Post> f,
        ReactionType type
    ) {
        var maybePost = postRepository.findById(postId);

        if (maybePost.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var post = maybePost.get();
        onPostReaction(post, user, type);
        f.accept(post);

        maybeValidatePost(post);

        postRepository.save(post);

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<Void> like(Long postId, User user) {
        return updatePostReactions(
            postId,
            user,
            post -> post.like(user),
            ReactionType.LIKE
        );
    }

    public ResponseEntity<Void> dislike(Long postId, User user) {
        return updatePostReactions(
            postId,
            user,
            post -> post.dislike(user),
            ReactionType.DISLIKE
        );
    }

    public ResponseEntity<Boolean> isLikedBy(Long postId, User user) {
        var maybePost = postRepository.findById(postId);

        if (maybePost.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var post = maybePost.get();
        return ResponseEntity.ok(hasReacted(user, post.getLikes()));
    }

    public ResponseEntity<Boolean> isDislikedBy(Long postId, User user) {
        var maybePost = postRepository.findById(postId);

        if (maybePost.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var post = maybePost.get();
        return ResponseEntity.ok(hasReacted(user, post.getDislikes()));
    }

    private boolean hasReacted(User user, Set<User> reactions) {
        return reactions.contains(user);
    }

    private enum ReactionType {
        LIKE,
        DISLIKE,
    }

    public ResponseEntity<Report> report(
        Long postId,
        PostReportRequest request,
        User user
    ) {
        var maybePost = postRepository.findById(postId);

        if (maybePost.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Post post = maybePost.get();

        Report report = new Report();

        report.setPost(post);
        report.setUser(user);
        report.setReason(request.getReason());

        return ResponseEntity.ok(reportRepository.save(report));
    }

    public Optional<Post> getPostById(Long postId) {
        return postRepository.findById(postId);
    }

    public long getVotesCountByUser(User user) {
        return postRepository.countByLikesContainsOrDislikesContains(
            Set.of(user),
            Set.of(user)
        );
    }

    public Post invalidatePost(Post post) {
        post.setValidated(false);
        return postRepository.save(post);
    }
}
