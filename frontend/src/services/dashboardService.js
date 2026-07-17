import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/admin",
});

// Automatically attach JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------- Dashboard ----------------

export const getDashboardData = async () => {
  const response = await API.get("/get_dashboard_data");
  return response.data;
};

// ---------------- Month Profit ----------------

export const getMonthWiseProfit = async () => {
  const response = await API.get("/get_month_wise_profit");
  return response.data;
};

// ---------------- Day Profit ----------------

export const getDayWiseProfit = async () => {
  const response = await API.get("/get_day_wise_profit");
  return response.data;
};