import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

/*  Global Middlewares */

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Security Headers
app.use(helmet());

// HTTP Request Logger
app.use(morgan("dev"));

// Parse JSON Request Body
app.use(express.json());

// Parse Form Data
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Parse Cookies
app.use(cookieParser());

/* Health Check Route */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Healthcare Appointment & Follow-up Manager API is running 🚀",
  });
});

/* API Routes */

app.use("/api/auth", authRoutes);

/*
Future Routes

app.use("/api/users", userRoutes);

app.use("/api/doctors", doctorRoutes);

app.use("/api/patients", patientRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/prescriptions", prescriptionRoutes);

app.use("/api/notifications", notificationRoutes);

*/

/* 404 Route Handler */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

/* Global Error Handler */

app.use(errorHandler);

export default app;