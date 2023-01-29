import { TrashIcon } from "@heroicons/react/24/outline";
import { MouseEventHandler, ReactNode } from "react";
import Button from "./Button";

type ListItemProps = {
  children: ReactNode;
  isEditing: boolean;
  onDelete: MouseEventHandler<HTMLButtonElement>;
};

export default function ListItem({
  children,
  isEditing,
  onDelete,
}: ListItemProps) {
  return (
    <div className="flex items-center justify-between rounded-md border p-3 transition-shadow hover:shadow">
      {children}
      {isEditing && (
        <Button onClick={onDelete}>
          <TrashIcon className="h-6" />
        </Button>
      )}
    </div>
  );
}
