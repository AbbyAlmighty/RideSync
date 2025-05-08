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
import org.springframework.web.bind.annotation.RestController;

import com.example.carpool.dto.BookingRequest;
import com.example.carpool.dto.BookingResponse;
import com.example.carpool.entity.Booking;
import com.example.carpool.entity.Ride;
import com.example.carpool.entity.User;
import com.example.carpool.service.BookingService;
import com.example.carpool.service.RideService;
import com.example.carpool.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private RideService rideService;

    @Autowired
    private UserService userService;

    // ✅ Book a ride
    @PostMapping("/book")
    public ResponseEntity<BookingResponse> bookRide(@RequestBody @Valid BookingRequest bookingRequest) {
        String username = getCurrentUsername();

        // Fetch the ride details
        Optional<Ride> optionalRide = rideService.getRideById(bookingRequest.getRideId());
        if (optionalRide.isEmpty()) {
        	BookingResponse response = new BookingResponse();
        	response.setMessage("Ride not found");
            return ResponseEntity.badRequest().body(response);
        }

        Ride ride = optionalRide.get();
        int seatsRequested = bookingRequest.getSeatsBooked();

        // Check if there are enough seats available
        if (ride.getAvailableSeats() < seatsRequested) {
        	BookingResponse response = new BookingResponse();
        	response.setMessage("Not enough seats available");
            return ResponseEntity.badRequest().body(response);
        }

        // Fetch the user details
        User passenger = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create and save the booking
        Booking booking = new Booking();
        booking.setPassenger(passenger);
        booking.setRide(ride);
        booking.setSeatsBooked(seatsRequested);
        bookingService.saveBooking(booking);

        // Update available seats and save the ride
        ride.setAvailableSeats(ride.getAvailableSeats() - seatsRequested);
        rideService.saveRide(ride);

        // Build and return response
        BookingResponse response = new BookingResponse(
                booking.getId(),
                passenger.getUsername(),
                ride.getId(),
                booking.getSeatsBooked(),
                booking.getRide().getOrigin(),
                booking.getRide().getDestination(),
                "Ride booked successfully"
        );

        return ResponseEntity.ok(response);
    }

    // ✅ Get booking details by ID
    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> getBookingDetails(@PathVariable Long id) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        if (booking.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Booking b = booking.get();
        BookingResponse response = new BookingResponse(
                b.getId(),
                b.getPassenger().getUsername(),
                b.getRide().getId(),
                b.getSeatsBooked(),
                b.getRide().getOrigin(),
                b.getRide().getDestination(),
                "Booking found"
        );

        return ResponseEntity.ok(response);
    }
    
 // ✅ Get all bookings for the currently logged-in user
    @GetMapping("/my-bookings")
    public ResponseEntity<?> getBookingsForCurrentUser() {
        String username = getCurrentUsername();

        Optional<User> userOpt = userService.getUserByUsername(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        User user = userOpt.get();
        List<Booking> bookings = bookingService.getBookingsByUser(user);

        List<BookingResponse> response = bookings.stream().map(b -> new BookingResponse(
                b.getId(),
                b.getPassenger().getUsername(),
                b.getRide().getId(),
                b.getSeatsBooked(),
                b.getRide().getOrigin(),
                b.getRide().getDestination(),
                "Booking found"
        )).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }


    // ✅ Helper to get currently logged-in user's username
    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
