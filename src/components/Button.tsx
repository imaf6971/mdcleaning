import { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="border rounded-md p-2 hover:shadow transition-shadow focus:bg-gray-200 focus:outline-none focus:ring"
    >
      {children}
    </button>
  );
}
