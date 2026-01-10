package com.example.backend.service.notification;

import com.example.backend.model.Notification;
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
}
