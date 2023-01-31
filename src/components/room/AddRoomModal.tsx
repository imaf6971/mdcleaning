import Input from "@/ui/Input";
import Modal from "@/ui/Modal";
import SubmitInput from "@/ui/SubmitInput";
import { trpc } from "@/utils/trpc";
import { ChangeEvent, FormEvent, useState } from "react";

type AddRoomModalProps = {
  onClose: () => void;
};

export default function AddRoomModal({ onClose }: AddRoomModalProps) {
  const utils = trpc.useContext();
  const addRooms = trpc.rooms.add.useMutation({
    onSuccess() {
      utils.rooms.list.invalidate();
    },
  });
  const [roomTitle, setRoomTitle] = useState("");

  function handleAddRoomSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addRooms.mutate({ title: roomTitle });
    onClose();
  }

  function handleRoomTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setRoomTitle(e.target.value);
  }

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleAddRoomSubmit} className="flex flex-col gap-2 p-2">
        <h2 className="mb-2 text-lg font-medium">Добавить Комнату</h2>
        <div>
          <Input
            id="roomTitle"
            value={roomTitle}
            label="Название"
            onChange={handleRoomTitleChange}
            required={true}
            minLength={3}
          />
        </div>
        <SubmitInput value="Добавить" />
      </form>
    </Modal>
  );
}
