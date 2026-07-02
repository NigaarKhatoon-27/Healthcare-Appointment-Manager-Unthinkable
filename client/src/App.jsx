import { Routes, Route } from "react-router-dom";

/* Public Layout */
import MainLayout from "./layouts/MainLayout";

/* Dashboard Layout */
import DashboardLayout from "./layouts/DashboardLayout";

/* Protected Route */
import ProtectedRoute from "./routes/ProtectedRoute";

/* Public Pages */
import Home from "./pages/shared/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* Patient Pages */
import Dashboard from "./pages/patient/Dashboard";
import Profile from "./pages/patient/Profile";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";
import Notifications from "./pages/patient/Notifications";

export default function App() {
  return (
    <Routes>

      {/* ==========================
          Public Routes
      ========================== */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/*  Patient Dashboard */}

      <Route
        path="/patient"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="profile"
          element={<Profile />}
        />

        <Route
          path="book-appointment"
          element={<BookAppointment />}
        />

        <Route
          path="appointments"
          element={<MyAppointments />}
        />

        <Route
          path="notifications"
          element={<Notifications />}
        />
      </Route>

    </Routes>
  );
}