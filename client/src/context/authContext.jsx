import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'; 
import { register, login, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        if (decoded.exp * 1000 > Date.now()) {
          setUser({
            email: decoded.email,
            id: decoded._id,
          });
        } else {
          localStorage.removeItem("accessToken");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("accessToken");
      }
    }
  }, []);

  const loginUser = async (formData) => {
    try {
      const response = await login(formData);
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setUser({
          email: decoded.email,
          username: decoded.username,
          id: decoded._id,
        });
        navigate("/");
        setError(null);
      }
    } catch (error) {
      setError(error.message);
      console.error("Login failed:", error);
    }
  };

  const registerUser = async (formData) => {
    try {
      const response = await register(formData);
      console.log(response);
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setUser({
          email: decoded.email,
          username: decoded.username,
          id: decoded._id,
        });
        navigate("/");
        setError(null);
      }
    } catch (error) {
      setError(error.message);
      console.error("Registration failed:", error);
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      localStorage.removeItem("accessToken");
      setUser(null);
      navigate("/");
    } catch (error) {
      setError("Failed to logout. Try again.");
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, registerUser, logoutUser, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};