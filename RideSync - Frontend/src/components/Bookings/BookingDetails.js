import React, { useEffect, useState } from 'react';
import bookingService from '../../services/bookingService';

const BookingDetails = ({ bookingId }) => {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const data = await bookingService.getBookingDetails(bookingId);
        setBooking(data);
      } catch (error) {
        console.error('Failed to fetch booking details', error);
      }
    };
    fetchBookingDetails();
  }, [bookingId]);

  return (
    booking ? (
      <div>
        <h3>Booking ID: {booking.bookingId}</h3>
        <p>Username: {booking.username}</p>
        <p>Ride ID: {booking.rideId}</p>
        <p>Seats Booked: {booking.seatsBooked}</p>
      </div>
    ) : (
      <p>Loading...</p>
    )
  );
};

export default BookingDetails;
