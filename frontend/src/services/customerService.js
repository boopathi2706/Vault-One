import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/customers",
});

// Attach JWT Token
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

// =============================
// Get All Customers
// =============================
export const getAllCustomers = async () => {
  const response = await API.get("/get_all_customers");
  return response.data;
};

// =============================
// Get Active Customers
// =============================
export const getActiveCustomers = async () => {
  const response = await API.get("/loan/active");
  return response.data;
};

// =============================
// Get Overdue Customers
// =============================
export const getOverdueCustomers = async () => {
  const response = await API.get("/loan/overdue");
  return response.data;
};

// =============================
// Get Closed Customers
// =============================
export const getClosedCustomers = async () => {
  const response = await API.get("/loan/closed");
  return response.data;
};

// =============================
// Create Customer
// =============================
export const createCustomer = async (formData) => {
  const response = await API.post(
    "/create_customer",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// =============================
// Get Customer By ID
// =============================
export const getCustomerById = async (id) => {
  const response = await API.get(`/customers/${id}`);
  return response.data;
};

// =============================
// Pay Interest
// =============================
export const payInterest = async (id) => {
  const response = await API.put(`/pay_interest/${id}`);
  return response.data;
};

// =============================
// Pay Principal
// =============================
export const payPrincipal = async (id) => {
  const response = await API.put(`/pay_principal/${id}`);
  return response.data;
};

// =============================
// Delete Customer
// =============================
export const deleteCustomer = async (id) => {
  const response = await API.delete(`/customers_delete/${id}`);
  return response.data;
};