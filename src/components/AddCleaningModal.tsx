import { trpc } from "@/utils/trpc";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../ui/Button";
import Modal from "./Modal";
import TimeInput from "../ui/TimeInput";

type AddCleaningModalProps = {
  roomId: number;
  isVisible: boolean;
  onClose: () => void;
};

// TODO: add validation and semantic HTML
// TODO: add staff like https://tailwindui.com/components/application-ui/forms/select-menus
export default function AddCleaningModal({
  roomId,
  isVisible,
  onClose,
}: AddCleaningModalProps) {
  const utils = trpc.useContext();
  const addCleaning = trpc.rooms.addCleaning.useMutation({
    onSuccess: () => {
      utils.rooms.byId.invalidate(roomId);
    },
  });
  const [from, setFrom] = useState(new Date(1970, 0, 1, 12, 0, 0, 0));
  const [to, setTo] = useState(new Date(1970, 0, 1, 12, 0, 0, 0));

  function handleToTimeInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTo((prev) => {
      try {
        return e.target.valueAsDate!;
      } catch (error) {
        return prev;
      }
    });
  }

  function handleFromTimeInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFrom((prev) => {
      try {
        return e.target.valueAsDate!;
      } catch (error) {
        return prev;
      }
    });
  }

  function handleAddCleaningSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addCleaning.mutate({ roomId, from, to });
    onClose();
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <form
        onSubmit={handleAddCleaningSubmit}
        className="flex flex-col gap-2 p-2"
      >
        <h2 className="mb-2 text-lg font-medium">Назначить уборку</h2>
        <div className="flex justify-between">
          <TimeInput
            label="C:"
            id="fromCleaning"
            value={from.toLocaleTimeString("ru-RU")}
            onChange={handleFromTimeInputChange}
          />
          <TimeInput
            label="По:"
            id="toCleaning"
            value={to.toLocaleTimeString("ru-RU")}
            onChange={handleToTimeInputChange}
          />
        </div>
        <input
          className="rounded-md border p-2 transition-shadow hover:cursor-pointer hover:shadow focus:bg-gray-200 focus:outline-none focus:ring"
          type="submit"
          value="Добавить"
        />
      </form>
    </Modal>
  );
}
