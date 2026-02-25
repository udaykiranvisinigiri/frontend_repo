import axios from 'axios';

const API_BASE_URL = 'https://s795z05z-8000.inc1.devtunnels.ms/api'; // Update with your backend URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

