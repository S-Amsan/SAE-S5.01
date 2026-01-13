package com.example.backend.service;

import com.example.backend.model.Notification;
import com.example.backend.model.Post;
import com.example.backend.model.User;
import com.example.backend.repository.NotificationRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> getNotificationsForUser(User user) {
        return notificationRepository.findAllByUserOrderByReceivedAtDesc(user);
    }

    void onPostLike(Post post, User user) {
        Notification notification = new Notification();

        notification.setUser(post.getUser());
        notification.setTitle("Post liké");
        notification.setDescription(
            "Ton post a été liké par " + user.getPseudo()
        );
        notification.setImageUrl(post.getImageUrl());

        notificationRepository.save(notification);
    }
}
