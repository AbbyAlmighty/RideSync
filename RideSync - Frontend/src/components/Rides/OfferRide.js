import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import rideService from '../../services/rideService';

const OfferRide = () => {
  const [rideData, setRideData] = useState({
    source: '',
    destination: '',
    departureTime: '',
    seatsAvailable: 1,
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setRideData({ ...rideData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await rideService.offerRide(rideData);
      setSuccess('Ride offered successfully!');
      setError('');
      setRideData({
        source: '',
        destination: '',
        departureTime: '',
        seatsAvailable: 1,
      });
    } catch (err) {
      console.error(err);
      setError('Failed to offer ride');
      setSuccess('');
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h3>Offer a Ride</h3>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="source">
          <Form.Label>Source</Form.Label>
          <Form.Control
            type="text"
            name="source"
            value={rideData.source}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="destination" className="mt-2">
          <Form.Label>Destination</Form.Label>
          <Form.Control
            type="text"
            name="destination"
            value={rideData.destination}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="departureTime" className="mt-2">
          <Form.Label>Departure Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="departureTime"
            value={rideData.departureTime}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="seatsAvailable" className="mt-2">
          <Form.Label>Available Seats</Form.Label>
          <Form.Control
            as="select"
            name="seatsAvailable"
            value={rideData.seatsAvailable}
            onChange={handleChange}
            required
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1} Seat{num + 1 > 1 ? 's' : ''}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Offer Ride
        </Button>
      </Form>
    </div>
  );
};

export default OfferRide;
