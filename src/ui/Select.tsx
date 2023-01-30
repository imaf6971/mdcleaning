import { useState } from "react";

type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value?: SelectOption) => void;
};

export default function Select({ options, value, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  function clearOptions() {
    onChange(undefined);
  }

  function selectOption(option: SelectOption) {
    onChange(option)
  }

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      className="relative flex min-h-[1.5em] w-80 items-center gap-2 rounded-md border p-2 transition-shadow hover:shadow focus:bg-gray-200 focus:outline-none focus:ring"
    >
      <span className="grow">{value?.label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation()
          clearOptions();
        }}
        className="cursor-pointer p-0 text-xl hover:text-gray-200 focus:text-gray-200"
      >
        &times;
      </button>
      <div className="w-[.05em] self-stretch bg-gray-200"></div>
      <div className="border-[.25em] border-solid border-transparent border-t-gray-200"></div>
      <ul
        className={`absolute left-0 top-full m-0 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 p-0 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {options.map((option) => (
          <li onClick={(e) => {
            e.stopPropagation()
            selectOption(option)
            setIsOpen(false)
          }} key={option.value} className="cursor-pointer py-1 px-2">
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
