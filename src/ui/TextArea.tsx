import { ChangeEventHandler } from "react";

type TextAreaProps = {
  value: string;
  label: string;
  id: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  required: boolean;
};

export default function TextArea({
  value,
  onChange,
  label,
  id,
  required,
}: TextAreaProps) {
  return (
    <div className="flex flex-col items-start justify-between text-center">
      <label
        className="mb-2 block font-medium text-gray-900 dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        required={required}
        id={id}
        className="btn-like invalid:ring-red-300 w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
