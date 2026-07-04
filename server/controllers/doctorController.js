import Doctor from "../models/Doctor.js";
import DoctorAvailability from "../models/DoctorAvailability.js";
import User from "../models/User.js";

/* Get All Doctors */

export const getAllDoctors = async (req, res, next) => {
  try {
    const {
      specialization,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {
      isAvailable: true,
    };

    if (specialization) {
      query.specialization = specialization;
    }

    let doctors = await Doctor.find(query)
      .populate(
        "user",
        "fullName email phone profileImage"
      )
      .sort({ createdAt: -1 });

    if (search) {
      doctors = doctors.filter((doctor) =>
        doctor.user?.fullName
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + Number(limit);

    const paginatedDoctors = doctors.slice(
      startIndex,
      endIndex
    );

    res.status(200).json({
      success: true,
      totalDoctors: doctors.length,
      currentPage: Number(page),
      totalPages: Math.ceil(
        doctors.length / limit
      ),
      doctors: paginatedDoctors,
    });
  } catch (error) {
    next(error);
  }
};

/*  Get Doctor By ID */

export const getDoctorById = async (
  req,
  res,
  next
) => {
  try {
    const doctor = await Doctor.findById(
      req.params.id
    ).populate(
      "user",
      "fullName email phone profileImage"
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    next(error);
  }
};

/*  Create Doctor */

export const createDoctor = async (
  req,
  res,
  next
) => {
  try {
    const {
      user,
      specialization,
      qualification,
      experience,
      consultationFee,
      hospital,
      department,
      licenseNumber,
      bio,
      languages,
    } = req.body;

    const existingUser =
      await User.findById(user);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const alreadyDoctor =
      await Doctor.findOne({ user });

    if (alreadyDoctor) {
      return res.status(400).json({
        success: false,
        message:
          "Doctor profile already exists.",
      });
    }

    const existingLicense =
      await Doctor.findOne({
        licenseNumber,
      });

    if (existingLicense) {
      return res.status(400).json({
        success: false,
        message:
          "License number already exists.",
      });
    }

    const doctor = await Doctor.create({
      user,
      specialization,
      qualification,
      experience,
      consultationFee,
      hospital,
      department,
      licenseNumber,
      bio,
      languages,
      profileCompleted: true,
    });

    res.status(201).json({
      success: true,
      message:
        "Doctor created successfully.",
      doctor,
    });
  } catch (error) {
    next(error);
  }
};

/*  Update Doctor */

export const updateDoctor = async (
  req,
  res,
  next
) => {
  try {
    const doctor =
      await Doctor.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Doctor updated successfully.",
      doctor,
    });
  } catch (error) {
    next(error);
  }
};

/* Delete Doctor */

export const deleteDoctor = async (
  req,
  res,
  next
) => {
  try {
    const doctor =
      await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    await doctor.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Doctor deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/* Doctor Availability */

export const getDoctorAvailability =
  async (req, res, next) => {
    try {
      const availability =
        await DoctorAvailability.find({
          doctor: req.params.id,
          isAvailable: true,
        }).sort({
          date: 1,
        });

      res.status(200).json({
        success: true,
        availability,
      });
    } catch (error) {
      next(error);
    }
  };