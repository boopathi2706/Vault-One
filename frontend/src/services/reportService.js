import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/customers",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getPaymentHistory = async () => {
  const response = await API.get("/payment_history");
  return response.data;
};