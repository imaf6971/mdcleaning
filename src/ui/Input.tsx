import { ChangeEventHandler } from "react";

type InputProps = {
  value: string;
  label: string;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function Input({ value, onChange, label, id }: InputProps) {
  return (
    <div className="flex items-center justify-between text-center">
      <label
        className="mb-2 block font-medium text-gray-900 dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        className="rounded-md border p-2 transition-shadow hover:shadow focus:bg-gray-200 focus:outline-none focus:ring"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
