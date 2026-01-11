package com.example.backend.model.http.res;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

/**
 * Dedicated DTO to expose user counters without mixing them into {@link UserResponse}.
 */
@Data
@Builder
@AllArgsConstructor
public class UserStatsResponse {

    private Integer points;
    private Integer trophies;
    private Integer flames;
    private Long ecoActions;
    private Long recoveredObjects;
    private LocalDate lastActionDate;
    private Long votes;
}
