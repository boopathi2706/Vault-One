import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/customers",
});

// Attach JWT Token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Get Today's Prices
export const getPrices = async () => {
  const response = await API.get("/price");
  return response.data;
};