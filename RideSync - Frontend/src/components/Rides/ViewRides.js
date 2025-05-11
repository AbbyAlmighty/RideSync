import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Form, Alert, Spinner, Container } from 'react-bootstrap';
import rideService from '../../services/rideService';
import bookingService from '../../services/bookingService';

const ViewRides = () => {
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seatSelections, setSeatSelections] = useState({});
  const [message, setMessage] = useState('');
  const [bookingRideId, setBookingRideId] = useState(null);
  const [searchSource, setSearchSource] = useState('');
  const [searchDestination, setSearchDestination] = useState('');

  useEffect(() => {
    fetchRides();
  }, []);

  useEffect(() => {
    filterRides();
  }, [searchSource, searchDestination, rides]);

  const fetchRides = async () => {
    setLoading(true);
    try {
      const response = await rideService.getAllRides();
      setRides(response.data);
    } catch (error) {
      console.error('Error fetching rides:', error);
      setMessage('Failed to load rides.');
    } finally {
      setLoading(false);
    }
  };

  const filterRides = () => {
    const filtered = rides.filter((ride) => {
      const sourceMatch = ride.source.toLowerCase().includes(searchSource.toLowerCase());
      const destinationMatch = ride.destination.toLowerCase().includes(searchDestination.toLowerCase());
      return sourceMatch && destinationMatch;
    });
    setFilteredRides(filtered);
  };

  const handleSeatChange = (rideId, value) => {
    setSeatSelections((prev) => ({
      ...prev,
      [rideId]: Number(value),
    }));
  };

  const handleBookRide = async (rideId) => {
    const seatsBooked = seatSelections[rideId] || 1;
    setBookingRideId(rideId);
    setMessage('');
    try {
      await bookingService.bookRide({ rideId, seatsBooked });
      setMessage(`Successfully booked ${seatsBooked} seat(s) for ride ${rideId}`);
      setSeatSelections((prev) => ({ ...prev, [rideId]: 1 }));
      await fetchRides(); // Refresh availability
    } catch (error) {
      console.error('Booking failed:', error);
      setMessage(`Booking failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setBookingRideId(null);
    }
  };

  if (loading) return <p>Loading rides...</p>;

  return (
    <Container>
      <Row className="mb-4">
        <Col md={5}>
          <Form.Control
            type="text"
            placeholder="Search Source"
            value={searchSource}
            onChange={(e) => setSearchSource(e.target.value)}
          />
        </Col>
        <Col md={5}>
          <Form.Control
            type="text"
            placeholder="Search Destination"
            value={searchDestination}
            onChange={(e) => setSearchDestination(e.target.value)}
          />
        </Col>
      </Row>

      {message && (
        <Alert variant={message.startsWith('Booking failed') ? 'danger' : 'success'} className="w-100">
          {message}
        </Alert>
      )}

      <Row>
        {filteredRides.length > 0 ? (
          filteredRides.map((ride) => (
            <Col key={ride.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{ride.source} to {ride.destination}</Card.Title>
                  <Card.Text>Departure Time: {new Date(ride.departureTime).toLocaleString()}</Card.Text>
                  <Card.Text>Seats Available: {ride.availableSeats}</Card.Text>

                  <Form.Group controlId={`seats-${ride.id}`} className="mb-2">
                    <Form.Label>Seats to Book</Form.Label>
                    <Form.Control
                      as="select"
                      value={seatSelections[ride.id] || 1}
                      onChange={(e) => handleSeatChange(ride.id, e.target.value)}
                    >
                      {[...Array(ride.seatsAvailable).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Button
                    variant="primary"
                    onClick={() => handleBookRide(ride.id)}
                    disabled={bookingRideId === ride.id}
                  >
                    {bookingRideId === ride.id ? (
                      <>
                        <Spinner animation="border" size="sm" /> Booking...
                      </>
                    ) : (
                      'Book Ride'
                    )}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No matching rides found.</p>
        )}
      </Row>
    </Container>
  );
};

export default ViewRides;
