package com.example.backend.repository;

import com.example.backend.model.Notification;
import com.example.backend.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository
    extends JpaRepository<Notification, Long>
{
    List<Notification> findByUserId(Long userId);

    List<Notification> findAllByUserOrderByReceivedAtDesc(User user);

    long countByUserIdAndStatus(Long userId, String status);
}
