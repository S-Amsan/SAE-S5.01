package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.UserStats;
import com.example.backend.model.action.Action;
import com.example.backend.model.action.ActionType;
import com.example.backend.repository.UserStatsRepository;
import com.example.backend.repository.action.ActionRepository;
import com.example.backend.repository.action.ActionTypeRepository;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActionService {

    @Autowired
    private ActionRepository actionRepository;

    @Autowired
    private ActionTypeRepository actionTypeRepository;

    @Autowired
    private UserStatsRepository userStatsRepository;

    public void onPostLike(User user) {
        if (user.getVotes() == 5) {
            user.setVotes(0);
            ActionType actionType = actionTypeRepository
                .findById(ActionTypes.VOTE_5_POSTS.getId())
                .get();

            updateActions(user, actionType);
        }
    }

    private boolean shouldWinAFlame(UserStats stats) {
        LocalDate lastActionDate = stats.getLastActionDate();

        if (lastActionDate == null) {
            return true;
        }

        return !lastActionDate.equals(LocalDate.now());
    }

    private void updateActions(User user, ActionType actionType) {
        Action action = new Action();

        action.setUser(user);
        action.setActionType(actionType);
        action = actionRepository.save(action);

        UserStats stats = userStatsRepository.findByUserId(user.getId()).get();

        if (shouldWinAFlame(stats)) {
            stats.setFlames(stats.getFlames() + 1);
        }

        stats.setLastActionDate(action.getAcquiredAt());
        userStatsRepository.save(stats);
    }

    private enum ActionTypes {
        DONATE(8),
        WIN_EVENT(7),
        WIN_COMPETITION(6),
        VOTE_5_POSTS(5),
        RECYCLE(4),
        ASSOCIATE(3),
        POST(2),
        RECOVER(1);

        private long id;

        public long getId() {
            return id;
        }

        ActionTypes(long actionId) {
            this.id = actionId;
        }
    }
}
