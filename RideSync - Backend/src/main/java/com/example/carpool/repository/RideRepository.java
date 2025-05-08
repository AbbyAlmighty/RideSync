package com.example.carpool.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.carpool.entity.Ride;
import com.example.carpool.entity.User;

public interface RideRepository extends JpaRepository<Ride, Long> {
    List<Ride> findByDriver(User driver);
    List<Ride> findByOriginAndDestination(String origin, String destination);
    List<Ride> findByOriginIgnoreCaseAndDestinationIgnoreCase(String origin, String destination);

}
