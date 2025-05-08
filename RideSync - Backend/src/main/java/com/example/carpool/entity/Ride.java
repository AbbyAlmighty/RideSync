package com.example.carpool.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String origin;
    private String destination;
    private LocalDateTime departureTime;
    private int availableSeats;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;

    @OneToMany(mappedBy = "ride")
    private List<Booking> bookings;
    
    
}
