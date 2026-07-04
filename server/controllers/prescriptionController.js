import Prescription from "../models/Prescription.js";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import sendEmail from "../utils/sendEmail.js";
import prescriptionTemplate from "../templates/prescriptionTemplate.js";

//  Create Prescription

export const createPrescription = async (
  req,
  res,
  next
) => {
  try {
    const {
      appointment,
      diagnosis,
      medicines,
      notes,
      followUpDate,
    } = req.body;

    // Check appointment exists
    const appointmentData =
      await Appointment.findById(appointment);

    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found.",
      });
    }

    // Logged-in doctor
    const doctor = await Doctor.findOne({
      user: req.user._id,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found.",
      });
    }

    // Verify ownership
    if (
      appointmentData.doctor.toString() !==
      doctor._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to create a prescription for this appointment.",
      });
    }

    // Check existing prescription
    const existingPrescription =
      await Prescription.findOne({
        appointment,
      });

    if (existingPrescription) {
      return res.status(400).json({
        success: false,
        message:
          "Prescription already exists for this appointment.",
      });
    }

    // Create prescription
    const prescription =
      await Prescription.create({
        appointment,
        patient:
          appointmentData.patient,
        doctor: doctor._id,
        diagnosis,
        medicines,
        notes,
        followUpDate,
      });

    // Mark appointment completed
    appointmentData.status = "completed";

    await appointmentData.save();

    /* ==========================
       Send Prescription Email
    ========================== */

    try {
      await prescription.populate([
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
        to: prescription.patient.email,

        subject: "Your Prescription is Ready",

        html: prescriptionTemplate({
          patientName:
            prescription.patient.fullName,

          doctorName:
            prescription.doctor.user.fullName,
        }),
      });
    } catch (emailError) {
      console.error(
        "Prescription Email Error:",
        emailError.message
      );
    }

    res.status(201).json({
      success: true,
      message:
        "Prescription created successfully.",
      prescription,
    });
  } catch (error) {
    next(error);
  }
};

// Get Prescription By ID

export const getPrescriptionById =
  async (req, res, next) => {
    try {
      const prescription =
        await Prescription.findById(
          req.params.id
        )
          .populate(
            "patient",
            "fullName email phone profileImage"
          )
          .populate({
            path: "doctor",
            populate: {
              path: "user",
              select:
                "fullName email phone profileImage",
            },
          })
          .populate("appointment");

      if (!prescription) {
        return res.status(404).json({
          success: false,
          message:
            "Prescription not found.",
        });
      }

      res.status(200).json({
        success: true,
        prescription,
      });
    } catch (error) {
      next(error);
    }
  };

  // Get Prescription By Appointment

export const getPrescriptionByAppointment =
  async (req, res, next) => {
    try {
      const prescription =
        await Prescription.findOne({
          appointment:
            req.params.appointmentId,
        })
          .populate(
            "patient",
            "fullName email phone profileImage"
          )
          .populate({
            path: "doctor",
            populate: {
              path: "user",
              select:
                "fullName email phone profileImage",
            },
          })
          .populate("appointment");

      if (!prescription) {
        return res.status(404).json({
          success: false,
          message:
            "Prescription not found.",
        });
      }

      res.status(200).json({
        success: true,
        prescription,
      });
    } catch (error) {
      next(error);
    }
  };


// Get Logged-in Patient Prescriptions


export const getMyPatientPrescriptions = async (
  req,
  res,
  next
) => {
  try {
    const prescriptions = await Prescription.find({
      patient: req.user._id,
    })
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "fullName email phone profileImage",
        },
      })
      .populate("appointment")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions,
    });
  } catch (error) {
    next(error);
  }
};


 //  Get Logged-in Doctor Prescriptions


export const getMyDoctorPrescriptions = async (
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

    const prescriptions = await Prescription.find({
      doctor: doctor._id,
    })
      .populate(
        "patient",
        "fullName email phone profileImage"
      )
      .populate("appointment")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions,
    });
  } catch (error) {
    next(error);
  }
};


 //  Update Prescription


export const updatePrescription = async (
  req,
  res,
  next
) => {
  try {
    const prescription =
      await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found.",
      });
    }

    const doctor = await Doctor.findOne({
      user: req.user._id,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found.",
      });
    }

    if (
      prescription.doctor.toString() !==
      doctor._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to update this prescription.",
      });
    }

    const {
      diagnosis,
      medicines,
      notes,
      followUpDate,
    } = req.body;

    prescription.diagnosis =
      diagnosis ?? prescription.diagnosis;

    prescription.medicines =
      medicines ?? prescription.medicines;

    prescription.notes =
      notes ?? prescription.notes;

    prescription.followUpDate =
      followUpDate ?? prescription.followUpDate;

    await prescription.save();

    res.status(200).json({
      success: true,
      message:
        "Prescription updated successfully.",
      prescription,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Prescription
export const deletePrescription = async (
  req,
  res,
  next
) => {
  try {
    const prescription =
      await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found.",
      });
    }

    await prescription.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Prescription deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// import Prescription from "../models/Prescription.js";
// import Appointment from "../models/Appointment.js";

// import sendEmail from "../utils/sendEmail.js";
// import prescriptionTemplate from "../templates/prescriptionTemplate.js";

// /* 
//    Send Prescription Email
//  */

// try {
//   await prescription.populate([
//     {
//       path: "patient",
//       select: "fullName email",
//     },
//     {
//       path: "doctor",
//       populate: {
//         path: "user",
//         select: "fullName",
//       },
//     },
//   ]);

//   await sendEmail({
//     to: prescription.patient.email,

//     subject: "Your Prescription is Ready",

//     html: prescriptionTemplate({
//       patientName:
//         prescription.patient.fullName,

//       doctorName:
//         prescription.doctor.user.fullName,
//     }),
//   });
// } catch (emailError) {
//   console.error(
//     "Prescription Email Error:",
//     emailError.message
//   );
// }

// return res.status(201).json({
//   success: true,
//   message:
//     "Prescription created successfully.",
//   prescription,
// });