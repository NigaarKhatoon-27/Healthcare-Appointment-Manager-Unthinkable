
import mongoose from "mongoose";

import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import DoctorAvailability from "../models/DoctorAvailability.js";

import sendEmail from "../utils/sendEmail.js";

import appointmentBookedTemplate from "../templates/appointmentBookedTemplate.js";
import appointmentCancelledTemplate from "../templates/appointmentCancelledTemplate.js";

/* 
   Book Appointment
 */

export const bookAppointment = async (
  req,
  res,
  next
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const {
      doctor,
      appointmentDate,
      slot,
      symptoms,
      meetingMode,
       aiSummary
    } = req.body;

    const patient = req.user._id;

    /* 
       Validate Doctor
   */

    const doctorExists =
      await Doctor.findById(doctor).session(session);

    if (!doctorExists) {
      throw new Error("Doctor not found.");
    }

    /* 
       Check Availability
     */

    const availability =
      await DoctorAvailability.findOne({
        doctor,
        date: appointmentDate,
      }).session(session);

    if (!availability) {
      throw new Error(
        "Doctor is not available on the selected date."
      );
    }

    /* 
       Find Slot
     */

    const selectedSlot =
      availability.slots.find(
        (item) =>
          item.startTime === slot.startTime &&
          item.endTime === slot.endTime
      );

    if (!selectedSlot) {
      throw new Error(
        "Selected slot not found."
      );
    }

    if (selectedSlot.isBooked) {
      throw new Error(
        "Selected slot is already booked."
      );
    }

    /* 
       Lock Slot
     */

    selectedSlot.isBooked = true;

    await availability.save({
      session,
    });

    /*
       Create Appointment
     */

    const appointment =
      await Appointment.create(
        [
          {
            patient,
            doctor,
            appointmentDate,
            slot,
            symptoms,
            aiSummary,
            meetingMode,
            status: "pending",
          },
        ],
        { session }
      );

    await session.commitTransaction();

    /* 
       Send Confirmation Email
     */

    try {
      await appointment[0].populate([
        {
          path: "patient",
          select: "fullName email",
        },
        {
          path: "doctor",
          populate: {
            path: "user",
            select: "fullName",
          },
        },
      ]);

      await sendEmail({
        to: appointment[0].patient.email,

        subject:
          "Appointment Confirmed",

        html:
          appointmentBookedTemplate({
            patientName:
              appointment[0].patient
                .fullName,

            doctorName:
              appointment[0].doctor.user
                .fullName,

            appointmentDate:
              new Date(
                appointment[0]
                  .appointmentDate
              ).toLocaleDateString(),

            startTime:
              appointment[0].slot
                .startTime,

            endTime:
              appointment[0].slot
                .endTime,

            meetingMode:
              appointment[0]
                .meetingMode,
          }),
      });
    } catch (emailError) {
      console.error(
        "Email Error:",
        emailError.message
      );
    }

    res.status(201).json({
      success: true,
      message:
        "Appointment booked successfully.",
      appointment:
        appointment[0],
    });
  } catch (error) {
    await session.abortTransaction();

    next(error);
  } finally {
    session.endSession();
  }
};

/* 
   Get Logged-in Patient Appointments
 */

export const getMyAppointments =
  async (req, res, next) => {
    try {
      const appointments =
        await Appointment.find({
          patient: req.user._id,
        })
          .populate({
            path: "doctor",
            populate: {
              path: "user",
              select:
                "fullName email phone",
            },
          })
          .sort({
            appointmentDate: -1,
          });

      res.status(200).json({
        success: true,
        count:
          appointments.length,
        appointments,
      });
    } catch (error) {
      next(error);
    }
  };

  /* 
   Get Doctor Appointments
 */

export const getDoctorAppointments = async (
  req,
  res,
  next
) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.params.doctorId,
    })
      .populate(
        "patient",
        "fullName email phone profileImage"
      )
      .sort({
        appointmentDate: 1,
      });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};

/*
   Get Appointment By ID
    */

export const getAppointmentById = async (
  req,
  res,
  next
) => {
  try {
    const appointment =
      await Appointment.findById(req.params.id)
        .populate(
          "patient",
          "fullName email phone profileImage"
        )
        .populate({
          path: "doctor",
          populate: {
            path: "user",
            select: "fullName email phone",
          },
        });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found.",
      });
    }

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

/* 
   Update Appointment Status
 */

export const updateAppointmentStatus =
  async (req, res, next) => {
    try {
      const { status } = req.body;

      const allowedStatuses = [
        "pending",
        "confirmed",
        "completed",
        "cancelled",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid appointment status.",
        });
      }

      const appointment =
        await Appointment.findById(req.params.id);

      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found.",
        });
      }

      appointment.status = status;

      await appointment.save();

      res.status(200).json({
        success: true,
        message:
          "Appointment status updated successfully.",
        appointment,
      });
    } catch (error) {
      next(error);
    }
  };

  /* 
   Get Logged-in Doctor Appointments
 */

export const getMyDoctorAppointments = async (
  req,
  res,
  next
) => {
  try {
    const doctor = await Doctor.findOne({
      user: req.user._id,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found.",
      });
    }

    const appointments = await Appointment.find({
      doctor: doctor._id,
    })
      .populate(
        "patient",
        "fullName email phone profileImage"
      )
      .sort({
        appointmentDate: 1,
      });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};

/*
   Cancel Appointment
 */

export const cancelAppointment = async (
  req,
  res,
  next
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const appointment =
      await Appointment.findById(
        req.params.id
      ).session(session);

    if (!appointment) {
      throw new Error(
        "Appointment not found."
      );
    }

    if (appointment.status === "cancelled") {
      throw new Error(
        "Appointment is already cancelled."
      );
    }

    appointment.status = "cancelled";

    await appointment.save({
      session,
    });

    /*
       Release Slot
     */

    const availability =
      await DoctorAvailability.findOne({
        doctor: appointment.doctor,
        date: appointment.appointmentDate,
      }).session(session);

    if (availability) {
      const slot =
        availability.slots.find(
          (item) =>
            item.startTime ===
              appointment.slot.startTime &&
            item.endTime ===
              appointment.slot.endTime
        );

      if (slot) {
        slot.isBooked = false;
      }

      await availability.save({
        session,
      });
    }

    await session.commitTransaction();

    /* 
       Send Cancellation Email
     */

    try {
      await appointment.populate([
        {
          path: "patient",
          select: "fullName email",
        },
        {
          path: "doctor",
          populate: {
            path: "user",
            select: "fullName",
          },
        },
      ]);

      await sendEmail({
        to: appointment.patient.email,

        subject:
          "Appointment Cancelled",

        html:
          appointmentCancelledTemplate({
            patientName:
              appointment.patient.fullName,

            doctorName:
              appointment.doctor.user
                .fullName,

            appointmentDate:
              new Date(
                appointment.appointmentDate
              ).toLocaleDateString(),
          }),
      });
    } catch (emailError) {
      console.error(
        "Cancellation Email Error:",
        emailError.message
      );
    }

    res.status(200).json({
      success: true,
      message:
        "Appointment cancelled successfully.",
    });
  } catch (error) {
    await session.abortTransaction();

    next(error);
  } finally {
    session.endSession();
  }
};