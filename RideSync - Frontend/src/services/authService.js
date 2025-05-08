import axios from 'axios';
import { authHeader } from '../utils/authHeader';

const API_URL = 'http://localhost:8080/api/auth/';

const login = (username, password) => {
  return axios
    .post(API_URL + 'login', { username, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const register = (username, password) => {
  return axios.post(API_URL + 'register', { username, password });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  login,
  register,
  getCurrentUser,
};
