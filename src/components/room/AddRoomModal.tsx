import Input from "@/ui/Input";
import Modal from "@/ui/Modal";
import SubmitInput from "@/ui/SubmitInput";
import { trpc } from "@/utils/trpc";
import { FormEvent, useState } from "react";

type AddRoomModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function AddRoomModal({
  isVisible,
  onClose,
}: AddRoomModalProps) {
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

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <form onSubmit={handleAddRoomSubmit} className="flex flex-col gap-2 p-2">
        <h2 className="mb-2 text-lg font-medium">Добавить Комнату</h2>
        <div>
          <Input
            id="roomTitle"
            value={roomTitle}
            label="Название"
            onChange={(e) => setRoomTitle(e.target.value)}
          />
        </div>
        <SubmitInput value="Добавить" />
      </form>
    </Modal>
  );
}
