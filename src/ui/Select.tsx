import { ChangeEventHandler, ReactElement } from "react";

type SelectProps = {
  id: string;
  name: string;
  label: string;
  options: () => JSX.Element[];
  value: string | number | readonly string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
};

export default function Select({
  id,
  label,
  options,
  value,
  onChange,
  name
}: SelectProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        className="mb-6 block w-full btn-like"
        value={value}
        onChange={onChange}
        name={name}
        id={id}
      >
        {options()}
      </select>
    </div>
  );
}
