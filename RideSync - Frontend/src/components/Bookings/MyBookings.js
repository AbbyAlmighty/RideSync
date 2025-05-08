import React, { useEffect, useState } from 'react';
import bookingService from '../../services/bookingService';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await bookingService.getMyBookings();
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching user bookings', err);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">My Booked Rides</h2>
      {bookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking.bookingId} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">From: {booking.rideSource}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">To: {booking.rideDestination}</h6>
                  <p className="card-text">
                    <strong>Seats Booked:</strong> {booking.seatsBooked}
                  </p>
                  <p className="text-success">{booking.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
