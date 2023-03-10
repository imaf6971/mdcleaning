import { ChangeEventHandler } from "react";

type InputProps = {
  value?: string;
  label: string;
  id: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  minLength?: number;
};

export default function Input({
  value,
  onChange,
  label,
  id,
  required = false,
  minLength = 0,
}: InputProps) {
  return (
    <div className="flex flex-col items-start justify-between text-center">
      <label className="mb-2 block font-medium text-gray-900" htmlFor={id}>
        {label}
      </label>
      <input
        required={required}
        minLength={minLength}
        id={id}
        name={id}
        className="btn-like w-full invalid:ring-red-300"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
