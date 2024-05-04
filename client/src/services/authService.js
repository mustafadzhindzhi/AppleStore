import { post } from "../utils/apiUtils";

const register = (userData) => {
  return post('/api/users/signup', userData);
};

const login = (credentials) => {
  return post('/api/users/login', credentials).then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token); 
      return data;
    } else {
      throw new Error('No token received');
    }
  });
};

const validateToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  return post('/api/users/validateToken', { token }).then(data => {
    return data.isValid;
  });
};

export { register, login, validateToken };