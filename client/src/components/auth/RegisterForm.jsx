import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import InputField from "../common/InputField";
import Button from "../common/Button";
import { registerUser } from "../../services/authService";

export default function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (formData) => {
    try {
      // Remove fields that should not be sent to the backend
      const { confirmPassword, terms, ...data } = formData;

      const response = await registerUser(data);

      toast.success(response.message);

      reset();

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <InputField
        label="Full Name"
        name="fullName"
        placeholder="Enter your full name"
        register={register}
        rules={{
          required: "Full name is required",
          minLength: {
            value: 3,
            message: "Name must contain at least 3 characters",
          },
        }}
        error={errors.fullName}
      />

      <InputField
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter your email"
        register={register}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
          },
        }}
        error={errors.email}
      />

      <InputField
        label="Phone Number"
        name="phone"
        type="tel"
        placeholder="Enter your phone number"
        register={register}
        rules={{
          required: "Phone number is required",
          pattern: {
            value: /^[6-9]\d{9}$/,
            message: "Enter a valid 10-digit phone number",
          },
        }}
        error={errors.phone}
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="Create a password"
        register={register}
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        }}
        error={errors.password}
      />

      <InputField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        register={register}
        rules={{
          required: "Please confirm your password",
          validate: (value) =>
            value === password || "Passwords do not match",
        }}
        error={errors.confirmPassword}
      />

      <div>
        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            {...register("terms", {
              required:
                "You must accept the Terms & Conditions",
            })}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
          />

          <span>
            I agree to the{" "}
            <Link
              to="/terms"
              className="font-semibold text-blue-600 hover:underline"
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy-policy"
              className="font-semibold text-blue-600 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {errors.terms && (
          <p className="mt-2 text-sm text-red-500">
            {errors.terms.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        fullWidth
        loading={isSubmitting}
      >
        Create Account
      </Button>

      <p className="text-center text-sm text-slate-600">
        Already have an account?
        <Link
          to="/login"
          className="ml-2 font-semibold text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}