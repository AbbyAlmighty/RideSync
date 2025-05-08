package com.example.carpool.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookingResponse {

    private Long bookingId;
    private String username;
    private Long rideId;
    private int seatsBooked;
    private String message; // ✅ Add message field
    private String rideSource;
    private String rideDestination;

    
}
