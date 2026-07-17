import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import CustomerBoard from "../pages/Customer/CustomerBoard.jsx";
import CustomerFullDetails from "../pages/Customer/CustomerFullDetails.jsx";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
         <Route
          path="/add-customer"
          element={
            <ProtectedRoute>
              <CustomerBoard/>
            </ProtectedRoute>
          }
        />
        <Route
    path="/customer/:id"
    element={<CustomerFullDetails />}
  />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;