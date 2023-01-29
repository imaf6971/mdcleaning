import { ChangeEventHandler, ReactElement } from "react";

type SelectProps = {
  id: string;
  name: string;
  label: string;
  options: () => JSX.Element[] | undefined;
  value: string | number | readonly string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
};

export default function Select({
  id,
  label,
  options,
  value,
  onChange,
  name,
}: SelectProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        className="btn-like mb-6 block w-full bg-white"
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
