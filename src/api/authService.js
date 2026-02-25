import authService from './authService';

export const apiService = {
  login: async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { username, password });
        return response.data; // { token, user }
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
  }
};