import axios from 'axios';
import { authHeader } from '../utils/authHeader';

const API_URL = 'http://localhost:8080/api/user/';

// Get user details
const getUserDetails = () => {
    console.log(API_URL + 'details', { headers: authHeader() });
  return axios.get(API_URL + 'details', { headers: authHeader() });
};

// Update user details
const updateUserDetails = (userData) => {
  return axios.put(API_URL + 'update', userData, { headers: authHeader() });
};

export default {
  getUserDetails,
  updateUserDetails,
};
