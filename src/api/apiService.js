import axios from 'axios';

const API_BASE_URL = 'https://ai-help-desk-71ar.onrender.com/api'; // Update with your backend URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

