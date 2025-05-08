package com.example.carpool.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RideResponse {

	private Long id;
	private String driver;
	private String source;
	private String destination;
	private LocalDateTime departureTime;
	private int seatsAvailable;
}
