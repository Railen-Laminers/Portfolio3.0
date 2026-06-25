import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Public: fetch the admin's profile (no auth needed)
export const getPublicProfile = async () => {
    const response = await axios.get(`${API_BASE}/users/profile`);
    return response.data;
};

// Update profile – requires auth (admin only)
export const updateUserProfile = async (data) => {
    const response = await axios.put(`${API_BASE}/users/profile`, data, {
        headers: getAuthHeader(),
    });
    return response.data;
};