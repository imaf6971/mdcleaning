import { trpc } from "@/utils/trpc";
import { ChangeEvent, FormEvent, useState } from "react";
import Modal from "../ui/Modal";
import TimeInput from "@/ui/TimeInput";
import SubmitInput from "@/ui/SubmitInput";

type AddCleaningModalProps = {
  roomId: number;
  isVisible: boolean;
  onClose: () => void;
};

// TODO: add validation
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
  const cleaners = trpc.staff.list.useQuery();
  const [from, setFrom] = useState(new Date(1970, 0, 1, 12, 0, 0, 0));
  const [to, setTo] = useState(new Date(1970, 0, 1, 12, 0, 0, 0));
  const [cleanerId, setCleanerId] = useState(0);

  function handleCleanerIdSelect(e: ChangeEvent<HTMLSelectElement>) {
    const cleaner = parseInt(e.target.value);
    setCleanerId(cleaner);
  }

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
    addCleaning.mutate({ roomId, from, to, cleanerId });
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
        <div>
          <label
            htmlFor="staffId"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Клинер
          </label>
          <select
            className="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={cleanerId}
            onChange={handleCleanerIdSelect}
            name="staffId"
            id="staffIdSelect"
          >
            {cleaners.data?.map((cleaner) => (
              <option value={cleaner.id} key={cleaner.id}>
                {`${cleaner.firstName} ${cleaner.lastName}`}
              </option>
            ))}
          </select>
        </div>
        <SubmitInput value="Добавить" />
      </form>
    </Modal>
  );
}
