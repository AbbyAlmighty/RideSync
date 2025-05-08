package com.example.carpool.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.carpool.entity.Ride;
import com.example.carpool.entity.User;
import com.example.carpool.repository.RideRepository;

@Service
@Transactional
public class RideService {

    @Autowired
    private RideRepository rideRepository;

    // Create a new ride offer
    public Ride createRide(Ride ride) {
        return rideRepository.save(ride);
    }

    // Get a ride by its ID
    public Optional<Ride> getRideById(Long id) {
        return rideRepository.findById(id);
    }

    // Get all rides offered by a specific driver
    public List<Ride> getRidesByDriver(User driver) {
        return rideRepository.findByDriver(driver);
    }


    // Save a ride offer or update an existing one
    public Ride saveRide(Ride ride) {
        return rideRepository.save(ride);
    }
    
    public List<Ride> getAllRides() {
        return rideRepository.findAll();
    }
    
    public List<Ride> searchRides(String source, String destination) {
        return rideRepository.findByOriginIgnoreCaseAndDestinationIgnoreCase(source, destination);
    }


}
