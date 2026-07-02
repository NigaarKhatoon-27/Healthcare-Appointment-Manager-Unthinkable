import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },

    // profileImage: {
    //   type: String,
    //   default: "",
    // },
    profileImage: {
  url: {
    type: String,
    default: "",
  },
  publicId: {
    type: String,
    default: "",
  },
},

    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      default: "patient",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    calendarConnected: {
      type: Boolean,
      default: false,
    },

    notificationPreferences: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },

      medicationReminders: {
        type: Boolean,
        default: true,
      },
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

/* Hash Password Before Saving */

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );

  next();
});

/* Compare Password*/

userSchema.methods.comparePassword =
  async function (enteredPassword) {
    return await bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

/* Generate JWT Token */

userSchema.methods.generateToken =
  function () {
    return jwt.sign(
      {
        id: this._id,
        role: this.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES_IN,
      }
    );
  };

const User = mongoose.model(
  "User",
  userSchema
);

export default User;