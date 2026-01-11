package com.example.backend.service.stats;

import com.example.backend.model.User;
import com.example.backend.model.UserStats;
import com.example.backend.model.http.res.UserStatsResponse;
import com.example.backend.repository.PostRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.UserStatsRepository;
import com.example.backend.service.PostService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Focused service responsible for building {@link UserStatsResponse} for a given user.
 *
 * <p>This keeps controller & other services free of persistence orchestration for stats,
 * while keeping "account/profile" concerns in {@code UserService}.
 */
@Service
public class UserStatsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserStatsRepository statsRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostService postService;

    /**
     * Builds the stats response for a user id.
     *
     * <p>If the user doesn't exist, returns {@link Optional#empty()}.
     * <p>If {@link UserStats} doesn't exist yet, it is created.
     */
    @Transactional
    public Optional<UserStatsResponse> getUserStats(Long userId) {
        var maybeUser = userRepository.findById(userId);
        if (maybeUser.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(buildResponseForUser(maybeUser.get()));
    }

    /**
     * Builds the stats response for an already-resolved {@link User}.
     *
     * <p>If {@link UserStats} doesn't exist yet, it is created.
     */
    @Transactional
    public UserStatsResponse buildResponseForUser(User user) {
        UserStats stats = statsRepository
            .findByUserId(user.getId())
            .orElseGet(() -> statsRepository.save(new UserStats(user)));

        return UserStatsResponse.builder()
            .points(stats.getPoints())
            .trophies(stats.getTrophies())
            .flames(stats.getFlames())
            .ecoActions(postRepository.countByUserAndValidatedTrue(user))
            .lastActionDate(stats.getLastActionDate())
            .votes(postService.getVotesCountByUser(user))
            .recoveredObjects(
                postRepository.countByUserAndValidatedTrueAndObjectIsNotNull(
                    user
                )
            )
            .build();
    }

    public void incrementVotesCount(User user) {
        UserStats stats = statsRepository
            .findByUserId(user.getId())
            .orElseThrow();

        stats.setVotes(stats.getVotes() + 1);
        statsRepository.save(stats);
    }
}
