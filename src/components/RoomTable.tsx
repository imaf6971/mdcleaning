import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { FormEvent, useState } from "react";
import BasicTable from "./BasicTable";
import Button from "../ui/Button";
import Input from "../ui/Input";
import ListItem from "../ui/ListItem";
import Modal from "../ui/Modal";
import SubmitInput from "@/ui/SubmitInput";

type Room = {
  id: number;
  title: string;
};

type RoomTableProps = {
  rooms: Room[];
};

export default function RoomTable({ rooms }: RoomTableProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  function roomLinks() {
    return rooms.map((room) => (
      <Link key={room.id} href={`/room/${room.id}`} className="min-w-full">
        <ListItem>{room.title}</ListItem>
      </Link>
    ));
  }

  function handleAddRoomClick() {
    setIsAdding(true);
  }

  function handleEditRoomClick() {
    setIsEditing((prev) => !prev);
  }

  return (
    <>
      <BasicTable
        heading="Комнаты"
        items={roomLinks}
        isEditing={isEditing}
        onAddClick={handleAddRoomClick}
        onChangeClick={handleEditRoomClick}
      />
      <AddRoomModal isVisible={isAdding} onClose={() => setIsAdding(false)} />
    </>
  );
}

type AddRoomModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

function AddRoomModal({ isVisible, onClose }: AddRoomModalProps) {
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
