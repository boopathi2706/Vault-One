import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import CustomerBoard from "../pages/CustomerBoard.jsx";
import CustomerFullDetails from "../components/Customer/CustomerFullDetails.jsx";
import ProtectedRoute from "./ProtectedRoute";
import ReportBoard from "../pages/ReportBoard.jsx";
import PriceBoard from "../pages/PriceBoard.jsx";
import LoanBoard from "../pages/LoanBoard.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

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
          path="/customer"
          element={
            <ProtectedRoute>
              <CustomerBoard/>
            </ProtectedRoute>
          }
        /> <Route
          path="/add_loan"
          element={
            <ProtectedRoute>
              <LoanBoard/>
            </ProtectedRoute>
          }
        />
        <Route
    path="/customer/:id"
    element={
       <ProtectedRoute>
    <CustomerFullDetails />
    </ProtectedRoute>}
  />
         <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportBoard/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/price_check"
          element={
            <ProtectedRoute>
              <PriceBoard/>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;