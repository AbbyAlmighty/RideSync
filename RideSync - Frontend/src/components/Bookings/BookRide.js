import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import bookingService from '../../services/bookingService';

const BookRide = ({ rideId }) => {
  const [seatsBooked, setSeatsBooked] = useState(1);

  const handleBookRide = async (e) => {
    e.preventDefault();
    try {
      await bookingService.bookRide(rideId, seatsBooked);
      alert('Ride booked successfully');
    } catch (error) {
      console.error('Failed to book ride', error);
    }
  };

  return (
    <Form onSubmit={handleBookRide}>
      <Form.Group controlId="seatsBooked">
        <Form.Label>Seats to Book</Form.Label>
        <Form.Control type="number" min="1" max="5" value={seatsBooked} onChange={(e) => setSeatsBooked(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">Book Ride</Button>
    </Form>
  );
};

export default BookRide;
