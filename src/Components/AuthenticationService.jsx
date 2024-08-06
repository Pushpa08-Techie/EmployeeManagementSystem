// src/Components/AuthenticationService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/token/generate-token';

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL, { email, password });
    return response.data; // { token: 'your-jwt-token' }
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Network Error');
  }
};

export default {
  login,
};
