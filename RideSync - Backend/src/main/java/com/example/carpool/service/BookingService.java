package com.example.carpool.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.carpool.entity.Booking;
import com.example.carpool.entity.Ride;
import com.example.carpool.entity.User;
import com.example.carpool.repository.BookingRepository;

@Service
@Transactional
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    // Create a new booking for a ride
    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    // Get a booking by its ID
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    // Get all bookings for a specific passenger
    public List<Booking> getBookingsByPassenger(User passenger) {
        return bookingRepository.findByPassenger(passenger);
    }

    // Get all bookings for a specific ride
    public List<Booking> getBookingsByRide(Ride ride) {
        return bookingRepository.findByRide(ride);
    }

    // Save a booking or update an existing one
    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

	public List<Booking> getBookingsByUser(User user) {
		// TODO Auto-generated method stub
		return bookingRepository.findByPassenger(user);
	}
}
