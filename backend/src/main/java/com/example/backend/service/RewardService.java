package com.example.backend.service;

import com.example.backend.model.Objekt;
import com.example.backend.model.User;
import com.example.backend.model.UserStats;
import com.example.backend.repository.UserStatsRepository;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RewardService {

    @Autowired
    private UserStatsRepository statsRepository;

    public void onObjectPickup(Objekt object) {
        incrementUserPoints(object.getPublishedBy(), 500);
        incrementUserPoints(object.getPickedUpBy(), 500);
    }

    public void maybeGainFlame(User user) {
        UserStats stats = statsRepository.findByUserId(user.getId()).get();

        if (shouldWinAFlame(stats)) {
            incrementUserFlames(stats);
        }
    }

    private boolean shouldWinAFlame(UserStats stats) {
        LocalDate lastActionDate = stats.getLastActionDate();

        if (lastActionDate == null) {
            return true;
        }

        return !lastActionDate.equals(LocalDate.now());
    }

    private void incrementUserFlames(UserStats stats) {
        stats.setFlames(stats.getFlames() + 1);
        statsRepository.save(stats);
    }

    private void incrementUserPoints(User user, int diff) {
        UserStats stats = statsRepository.findByUserId(user.getId()).get();
        stats.setPoints(stats.getPoints() + diff);
        stats.setTrophies(stats.getTrophies() + diff);
        statsRepository.save(stats);
    }
}
