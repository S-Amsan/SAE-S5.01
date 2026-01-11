package com.example.backend.repository;

import com.example.backend.model.Post;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    long countByUserAndValidatedTrue(User user);
    long countByUserAndValidatedTrueAndObjectIsNotNull(User user);
    long countByLikesContainsOrDislikesContains(Set<User> likes, Set<User> dislikes);
}
