import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    slot: {
      startTime: {
        type: String,
        required: true,
      },

      endTime: {
        type: String,
        required: true,
      },
    },

    meetingMode: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },

    meetingLink: {
      type: String,
      default: "",
    },

    symptoms: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    aiSummary: {
      type: String,
      default: "",
    },

    doctorNotes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    followUpDate: {
      type: Date,
    },

    cancellationReason: {
      type: String,
      default: "",
    },

    prescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model(
  "Appointment",
  appointmentSchema
);

export default Appointment;