import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";


  // Doctor Dashboard Statistics


export const getDoctorDashboard = async (
  req,
  res,
  next
) => {
  try {
    // Find logged-in doctor's profile
    const doctor = await Doctor.findOne({
      user: req.user._id,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found.",
      });
    }

    // Today's Date
    const today = new Date();

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    // Dashboard Statistics
    const [
      totalAppointments,
      todayAppointments,
      pendingAppointments,
      confirmedAppointments,
      completedAppointments,
      cancelledAppointments,
      totalPatients,
      recentAppointments,
    ] = await Promise.all([
      Appointment.countDocuments({
        doctor: doctor._id,
      }),

      Appointment.countDocuments({
        doctor: doctor._id,
        appointmentDate: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      }),

      Appointment.countDocuments({
        doctor: doctor._id,
        status: "pending",
      }),

      Appointment.countDocuments({
        doctor: doctor._id,
        status: "confirmed",
      }),

      Appointment.countDocuments({
        doctor: doctor._id,
        status: "completed",
      }),

      Appointment.countDocuments({
        doctor: doctor._id,
        status: "cancelled",
      }),

      Appointment.distinct("patient", {
        doctor: doctor._id,
      }).then((patients) => patients.length),

      Appointment.find({
        doctor: doctor._id,
      })
        .populate(
          "patient",
          "fullName email phone profileImage"
        )
        .sort({
          appointmentDate: -1,
        })
        .limit(5),
    ]);

    res.status(200).json({
      success: true,

      dashboard: {
        totalAppointments,
        todayAppointments,
        pendingAppointments,
        confirmedAppointments,
        completedAppointments,
        cancelledAppointments,
        totalPatients,
        recentAppointments,
      },
    });
  } catch (error) {
    next(error);
  }
};