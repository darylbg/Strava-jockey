import React, { useContext, useEffect } from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import LandingPage from "./Home/LandingPage";
import DetailsPage from "./Home/DetailsPage";
import AdminLoginPage from "./Home/AdminLoginPage";
import DashboardSummary from "./Dashboard/DashboardSummary";
import DashboardLayout from "./Dashboard/DashboardLayout";
import DashboardJockeys from "./Dashboard/DashboardJockeys";
import DashboardOrders from "./Dashboard/DashboardOrders";
import { AuthContext, AuthProvider } from "./AuthProvider";

// ProtectedRoute.jsx
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return user ? children : <Navigate to="/admin" replace />;
};
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-1 flex-col p-5 gap-5 max-w-screen-xl">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-orange-500 font-bold border-b-2 border-orange-500">STRAVAJOCKEY</Link>
            <input type="text" placeholder="tracking no..."/>
          </div>
          <div className="flex flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/details" element={<DetailsPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />

            {/* Nested dashboard routes */}
            <Route
              path="/admin/dashboard/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardSummary />} />
              <Route path="jockeys" element={<DashboardJockeys />} />
              <Route path="orders" element={<DashboardOrders />} />
            </Route>
          </Routes>
          </div>
          <div className="flex justify-between items-center">
            <Link to="/" className="text-orange-500 font-bold border-t-2 border-orange-500">STRAVAJOCKEY</Link>
            <button>Back to top</button>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
