import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import InputField from "../common/InputField";
import Button from "../common/Button";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);

      // Backend integration will be added later
      // await axios.post("/api/auth/login", data);

      toast.success("Login successful!");
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
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
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
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

      {/* Remember Me & Forgot Password */}

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          Remember Me
        </label>

        <Link
          to="/forgot-password"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Login Button */}

      <Button
        type="submit"
        fullWidth
        loading={isSubmitting}
      >
        Login
      </Button>

      {/* Register Link */}

      <p className="text-center text-sm text-slate-600">
        Don't have an account?
        <Link
          to="/register"
          className="ml-2 font-semibold text-blue-600 hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
}