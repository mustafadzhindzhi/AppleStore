import { get, post } from '../api/api';  
export const API_BASE_URL = 'http://localhost:3000';

export const register = (userData) => {
    return post(`${API_BASE_URL}/users/register`, userData);
};

export const login = (userData) => {
    return post(`${API_BASE_URL}/users/login`, userData);
};

export const logout = () => {
    return get(`${API_BASE_URL}/users/logout`);
};