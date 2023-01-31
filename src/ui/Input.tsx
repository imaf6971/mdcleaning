import { ChangeEventHandler } from "react";

type InputProps = {
  value: string;
  label: string;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  required: boolean;
  minLength: number;
};

export default function Input({
  value,
  onChange,
  label,
  id,
  required,
  minLength,
}: InputProps) {
  return (
    <div className="flex items-center justify-between text-center">
      <label
        className="mb-2 block font-medium text-gray-900 dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        required={required}
        minLength={minLength}
        id={id}
        className="btn-like invalid:ring-red-300"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
