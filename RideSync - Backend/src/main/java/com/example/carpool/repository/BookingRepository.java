package com.example.carpool.repository;

import com.example.carpool.entity.Booking;
import com.example.carpool.entity.User;
import com.example.carpool.entity.Ride;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByPassenger(User passenger);
    List<Booking> findByRide(Ride ride);
}
