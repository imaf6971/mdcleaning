import { ChangeEventHandler } from "react";

type TimeInputProps = {
  value: string | number | readonly string[];
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function TimeInput({ value, onChange }: TimeInputProps) {
  return (
    <input
      className="rounded-md border p-2 transition-shadow hover:shadow focus:bg-gray-200 focus:outline-none focus:ring"
      type="time"
      value={value}
      onChange={onChange}
    />
  );
}
