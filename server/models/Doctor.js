import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },

    hospital: {
      type: String,
      required: true,
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalPatients: {
      type: Number,
      default: 0,
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model(
  "Doctor",
  doctorSchema
);

export default Doctor;