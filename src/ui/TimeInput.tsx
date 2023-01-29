import { ChangeEventHandler } from "react";

type TimeInputProps = {
  value: string | number | readonly string[];
  onChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
  label: string;
};

export default function TimeInput({
  value,
  onChange,
  id,
  label,
}: TimeInputProps) {
  return (
    <div>
      <label
        className="mb-2 block font-medium text-gray-900 dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        className="btn-like"
        type="time"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
