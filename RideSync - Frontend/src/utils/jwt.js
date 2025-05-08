// src/utils/jwt.js
import jwtDecode from 'jwt-decode';

export function getDecodedToken() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    try {
      return jwtDecode(user.token);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  return null;
}

export function isTokenExpired() {
  const decodedToken = getDecodedToken();

  if (decodedToken && decodedToken.exp) {
    return decodedToken.exp * 1000 < Date.now();
  }
  return true;
}
