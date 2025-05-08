import axios from 'axios';
import { authHeader } from '../utils/authHeader';

const API_URL = 'http://localhost:8080/api/rides/';

// Offer a new ride
const offerRide = (rideData) => {
  return axios.post(API_URL + 'offer', rideData, { headers: authHeader() });
};

// Get all rides
const getAllRides = () => {
  return axios.get(API_URL + 'all', { headers: authHeader() });
};

// Get ride details by ID
const getRideById = (id) => {
  return axios.get(API_URL + id, { headers: authHeader() });
};

const searchRides = (source, destination) => {
  return axios.get(API_URL + `search?source=${source}&destination=${destination}`, {
    headers: authHeader()
  });
};

export default {
  offerRide,
  getAllRides,
  getRideById,
  searchRides,
}