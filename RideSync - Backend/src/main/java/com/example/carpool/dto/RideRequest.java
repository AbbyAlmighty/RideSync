package com.example.carpool.dto;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RideRequest {

    @NotEmpty(message = "Source location cannot be empty")
    private String source;

    @NotEmpty(message = "Destination location cannot be empty")
    private String destination;

    private LocalDateTime departureTime;

    private int seatsAvailable;
}
