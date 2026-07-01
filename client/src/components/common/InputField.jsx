import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function InputField({
  label,
  type = "text",
  placeholder,
  name,
  register,
  rules = {},
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="mb-6">

      {/* Label */}

      <label
        htmlFor={name}
        className="mb-2 block font-semibold text-slate-700"
      >
        {label}
      </label>

      {/* Input */}

      <div className="relative">

        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          {...register(name, rules)}
          className={`w-full rounded-xl border bg-white px-4 py-3 pr-12 outline-none transition-all duration-300

          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          }`}
        />

        {/* Password Toggle */}

        {type === "password" && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}

      </div>

      {/* Error */}

      {error && (
        <p className="mt-2 text-sm font-medium text-red-500">
          {error.message}
        </p>
      )}

    </div>
  );
}