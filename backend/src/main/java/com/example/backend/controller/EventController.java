package com.example.backend.controller;

import com.example.backend.model.event.Event;
import com.example.backend.model.security.MyUserDetails;
import com.example.backend.repository.event.EventParticipantRepository;
import com.example.backend.repository.event.EventRepository;
import com.example.backend.service.EventService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventParticipantRepository eventParticipantRepository;

    @Autowired
    private EventService eventService;

    @GetMapping("/all")
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/following")
    public List<Event> getMyEvents(
        @AuthenticationPrincipal MyUserDetails userDetails
    ) {
        return eventRepository.findAllByParticipantsUser(userDetails.getUser());
    }

    @GetMapping("/latest")
    public Event getLatestEvent() {
        return eventService.getCurrentEvent();
    }

    @GetMapping("/{eventId}/participantsCount")
    public ResponseEntity<Integer> getParticipantsCount(
        @PathVariable Long eventId
    ) {
        var maybeEvent = eventRepository.findById(eventId);
        if (maybeEvent.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var event = maybeEvent.get();
        return ResponseEntity.ok(event.getParticipants().size());
    }

    @GetMapping("/{eventId}/qualifiedParticipantsCount")
    public ResponseEntity<Integer> getQualifiedParticipantsCount(
        @PathVariable Long eventId
    ) {
        var maybeEvent = eventRepository.findById(eventId);
        if (maybeEvent.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var event = maybeEvent.get();
        return ResponseEntity.ok(
            eventParticipantRepository
                .findAllByEventAndPointsGreaterThanEqual(
                    event,
                    event.getGoalPoints()
                )
                .size()
        );
    }
}
