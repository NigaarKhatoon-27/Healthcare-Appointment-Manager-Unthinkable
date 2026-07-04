import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

/* Routes */

import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

/* Middleware */

import errorHandler from "./middleware/errorHandler.js";

/* Email Utility */

import sendEmail from "./utils/sendEmail.js";

const app = express();


  // Global Middleware


app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());


  // Health Check


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Healthcare Appointment & Follow-up Manager API is running 🚀",
    version: "1.0.0",
  });
});

/* 
   Test Email Route
   (Temporary - Remove before deployment)
 */

app.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "Healthcare Manager Email Test",
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>✅ Email Configuration Successful</h2>
          <p>Your Healthcare Appointment Manager email service is working correctly.</p>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Test email sent successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


  // API Routes


app.use("/api/auth", authRoutes);

app.use("/api/doctors", doctorRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/prescriptions", prescriptionRoutes);

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);


  // Future Modules


// app.use("/api/patients", patientRoutes);

// app.use("/api/notifications", notificationRoutes);

// app.use("/api/payments", paymentRoutes);

// app.use("/api/reminders", reminderRoutes);


 //  404 Handler


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});


  // Global Error Handler


app.use(errorHandler);

export default app;