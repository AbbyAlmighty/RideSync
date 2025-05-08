import axios from 'axios';
import { authHeader } from '../utils/authHeader';

const API_URL = 'http://localhost:8080/api/bookings/';

// Book a ride
const bookRide = (bookingData) => {
  return axios.post(API_URL + 'book', bookingData, {
    headers: authHeader(),
  });
};

// Get booking details
const getBookingDetails = (id) => {
  return axios.get(API_URL + id, { headers: authHeader() });
};

const getMyBookings = () => {
  return axios.get(API_URL + 'my-bookings', {
    headers: authHeader(),
  });
};

export default {
  bookRide,
  getBookingDetails,
  getMyBookings,
};
