export default function SelectField({
  label,
  name,
  register,
  rules = {},
  error,
  options = [],
}) {
  return (
    <div className="mb-6">
      {/* Label */}
      <label
        htmlFor={name}
        className="mb-2 block font-semibold text-slate-700"
      >
        {label}
      </label>

      {/* Select */}
      <select
        id={name}
        {...register(name, rules)}
        className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition-all duration-300
        ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        }`}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {/* Error */}

      {error && (
        <p className="mt-2 text-sm font-medium text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}