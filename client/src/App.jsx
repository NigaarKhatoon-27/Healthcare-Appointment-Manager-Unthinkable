import { Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

/* Protected Route */
import ProtectedRoute from "./routes/ProtectedRoute";


  // Public Pages


import Home from "./pages/shared/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";


   // Patient Pages


import Dashboard from "./pages/patient/Dashboard";
import Profile from "./pages/patient/Profile";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";
import Notifications from "./pages/patient/Notifications";

 //  Doctor Pages


import DoctorDashboard from "./pages/doctor/Dashboard";
import DoctorAppointments from "./pages/doctor/Appointments";
import Consultation from "./pages/doctor/Consultation";
// import DoctorProfile from "./pages/doctor/Profile";
// import DoctorSchedule from "./pages/doctor/Schedule";

export default function App() {
  return (
    <Routes>

     
         // Public Routes
      

      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={<Home />}
        />
      </Route>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      
         // Patient Routes
   

      <Route
        path="/patient"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <Navigate
              to="dashboard"
              replace
            />
          }
        />

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

      
        //  Doctor Routes
      

      <Route
        path="/doctor"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <Navigate
              to="dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={<DoctorDashboard />}
        />

        <Route
          path="appointments"
          element={<DoctorAppointments />}
        />

        <Route
          path="consultation/:appointmentId"
          element={<Consultation />}
        />

        {/* <Route
          path="schedule"
          element={<DoctorSchedule />}
        /> */}

        {/* <Route
          path="profile"
          element={<DoctorProfile />}
        /> */}
      </Route>

     
          // 404
      

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}