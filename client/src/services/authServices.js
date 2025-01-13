// services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

export const authService = {
  async login(credentials) {
    const response = await axiosInstance.post('/admin/login', credentials);
    return response.data;
  },

  async logout() {
    await axiosInstance.post('/admin/logout');
    localStorage.removeItem('StravaJockey user');
    // Clear any other stored auth data
    sessionStorage.clear();
  },

  async verifyAuth() {
    const response = await axiosInstance.get('/admin');
    return response.data.user;
  }
};