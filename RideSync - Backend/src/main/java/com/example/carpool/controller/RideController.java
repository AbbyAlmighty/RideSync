package com.example.carpool.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.carpool.dto.RideRequest;
import com.example.carpool.dto.RideResponse;
import com.example.carpool.entity.Ride;
import com.example.carpool.entity.User;
import com.example.carpool.service.RideService;
import com.example.carpool.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/rides")
public class RideController {

    @Autowired
    private RideService rideService;

    @Autowired
    private UserService userService;

    // ✅ Create a new ride offer
    @PostMapping("/offer")
    public ResponseEntity<String> offerRide(@RequestBody @Valid RideRequest rideRequest) {
        String username = getCurrentUsername();
        User driver = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Ride ride = new Ride();
        ride.setDriver(driver);
        ride.setOrigin(rideRequest.getSource());
        ride.setDestination(rideRequest.getDestination());
        ride.setDepartureTime(rideRequest.getDepartureTime());
        ride.setAvailableSeats(rideRequest.getSeatsAvailable());

        rideService.saveRide(ride);
        return ResponseEntity.ok("Ride offered successfully");
    }

    // ✅ Get all rides
    @GetMapping("/all")
    public ResponseEntity<List<RideResponse>> getAllRides() {
        List<Ride> rides = rideService.getAllRides();
        List<RideResponse> rideResponses = rides.stream()
                .map(ride -> new RideResponse(ride.getId(), ride.getDriver().getUsername(), ride.getOrigin(),
                        ride.getDestination(), ride.getDepartureTime(), ride.getAvailableSeats()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(rideResponses);
    }

    // ✅ Get a ride by ID
    @GetMapping("/{id}")
    public ResponseEntity<RideResponse> getRideById(@PathVariable Long id) {
        Optional<Ride> ride = rideService.getRideById(id);
        if (ride.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Ride r = ride.get();
        RideResponse rideResponse = new RideResponse(r.getId(), r.getDriver().getUsername(), r.getOrigin(),
                r.getDestination(), r.getDepartureTime(), r.getAvailableSeats());
        return ResponseEntity.ok(rideResponse);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<RideResponse>> searchRides(
            @RequestParam String source,
            @RequestParam String destination) {

        List<Ride> rides = rideService.searchRides(source, destination);
        List<RideResponse> responses = rides.stream()
            .map(ride -> new RideResponse(
                    ride.getId(),
                    ride.getDriver().getUsername(),
                    ride.getOrigin(),
                    ride.getDestination(),
                    ride.getDepartureTime(),
                    ride.getAvailableSeats()))
            .collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
