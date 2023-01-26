import React, { MouseEventHandler } from "react";
import Button from "./Button";

type BasicTableProps = {
  heading?: string;
  items: () => JSX.Element[] | undefined;
  onChangeClick: MouseEventHandler<HTMLButtonElement>;
  onAddClick: MouseEventHandler<HTMLButtonElement>;
};

export default function BasicTable({
  heading,
  items,
  onChangeClick,
  onAddClick,
}: BasicTableProps) {
  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{heading || " "}</h2>
        <div className="flex gap-2">
          <Button onClick={onChangeClick}>Изменить</Button>
          <Button onClick={onAddClick}>Добавить</Button>
        </div>
      </div>
      <div className="m-4 flex flex-col items-center justify-center gap-2">
        {items()}
      </div>
    </section>
  );
}
