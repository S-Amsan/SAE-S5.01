package com.example.backend.service;

import com.example.backend.exceptions.FileUploadException;
import com.example.backend.exceptions.ResourceNotFoundException;
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
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Consumer;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private NotificationService notificationService;

    public Post publish(PostPublishRequest request, User user)
        throws IOException {
        var response = fileUploadService.upload(request.getImage());

        if (response.getError() != null) {
            throw new FileUploadException(
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

            if (type == ReactionType.LIKE) {
                notificationService.onPostLike(post, user);
            }
        }
    }

    private void maybeValidatePost(Post post) {
        if (post.getLikes().size() == 5) {
            post.setValidated(true);
        } else if (post.getDislikes().size() == 5) {
            post.setValidated(false);
        }
    }

    private void updatePostReactions(
        Long postId,
        User user,
        Consumer<Post> f,
        ReactionType type
    ) {
        var maybePost = postRepository.findById(postId);

        if (maybePost.isEmpty()) {
            throw new ResourceNotFoundException("Post", postId);
        }

        var post = maybePost.get();
        onPostReaction(post, user, type);
        f.accept(post);

        maybeValidatePost(post);

        postRepository.save(post);
    }

    public void like(Long postId, User user) {
        updatePostReactions(
            postId,
            user,
            post -> post.like(user),
            ReactionType.LIKE
        );
    }

    public void dislike(Long postId, User user) {
        updatePostReactions(
            postId,
            user,
            post -> post.dislike(user),
            ReactionType.DISLIKE
        );
    }

    public boolean isLikedBy(Long postId, User user) {
        var maybePost = postRepository.findById(postId);

        if (maybePost.isEmpty()) {
            throw new ResourceNotFoundException("Post", postId);
        }

        var post = maybePost.get();
        return hasReacted(user, post.getLikes());
    }

    public boolean isDislikedBy(Long postId, User user) {
        var maybePost = postRepository.findById(postId);

        if (maybePost.isEmpty()) {
            throw new ResourceNotFoundException("Post", postId);
        }

        var post = maybePost.get();
        return hasReacted(user, post.getDislikes());
    }

    private boolean hasReacted(User user, Set<User> reactions) {
        return reactions.contains(user);
    }

    private enum ReactionType {
        LIKE,
        DISLIKE,
    }

    public Report report(Long postId, PostReportRequest request, User user) {
        var maybePost = postRepository.findById(postId);

        if (maybePost.isEmpty()) {
            throw new ResourceNotFoundException("Post", postId);
        }

        Post post = maybePost.get();

        Report report = new Report();

        report.setPost(post);
        report.setUser(user);
        report.setReason(request.getReason());

        return reportRepository.save(report);
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

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
}
