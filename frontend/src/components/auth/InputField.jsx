import React from "react";

function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="mb-5">
      <label className="block text-gray-300 mb-2 font-medium">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          px-4
          py-3
          rounded-xl
          bg-slate-900
          border
          border-slate-700
          text-white
          outline-none
          transition-all
          duration-300
          focus:border-cyan-400
          focus:ring-2
          focus:ring-cyan-500/30
          placeholder:text-gray-500
        "
      />
    </div>
  );
}

export default InputField;