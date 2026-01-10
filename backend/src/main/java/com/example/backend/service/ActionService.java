package com.example.backend.service;

import com.example.backend.model.Post;
import com.example.backend.model.User;
import com.example.backend.model.UserStats;
import com.example.backend.model.action.Action;
import com.example.backend.model.action.ActionType;
import com.example.backend.repository.UserStatsRepository;
import com.example.backend.repository.action.ActionRepository;
import com.example.backend.repository.action.ActionTypeRepository;
import java.util.List;
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

    @Autowired
    private RewardService rewardService;

    public List<Action> getActionsForUser(User user) {
        return actionRepository.findAllByUser(user);
    }

    public void onPostReaction(Post post) {
        if (post.getLikes().size() == 5) {
            rewardService.on5Likes(post.getUser());
            giveActionTo(post.getUser(), ActionTypes.VOTE_5_POSTS);
        }
    }

    private void giveActionTo(User user, ActionTypes type) {
        ActionType actionType = actionTypeRepository
            .findById(type.getId())
            .get();

        Action action = new Action();

        action.setUser(user);
        action.setActionType(actionType);
        action = actionRepository.save(action);

        UserStats stats = userStatsRepository.findByUserId(user.getId()).get();

        rewardService.maybeGainFlame(user);

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
