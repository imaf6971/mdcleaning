import { ChangeEventHandler } from "react";

type InputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function Input({ value, onChange }: InputProps) {
  return (
    <input
      className="rounded-md border p-2 transition-shadow hover:shadow focus:bg-gray-200 focus:outline-none focus:ring"
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}
