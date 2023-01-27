import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useState } from "react";
import BasicTable from "./BasicTable";
import Button from "./ui/Button";
import Input from "./ui/Input";
import ListItem from "./ListItem";
import Modal from "./Modal";

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
    <div className="mx-auto md:w-2/3">
      <BasicTable
        items={roomLinks}
        isEditing={isEditing}
        onAddClick={handleAddRoomClick}
        onChangeClick={handleEditRoomClick}
      />
      <AddRoomModal isVisible={isAdding} onClose={() => setIsAdding(false)} />
    </div>
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

  function onAddButtonClick() {
    addRooms.mutate({ title: roomTitle });
    onClose();
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="flex flex-col gap-2 p-2">
        <h2 className="mb-2 text-lg font-medium">Добавить Комнату</h2>
        <div className="flex justify-between">
          <Input
            id="roomTitle"
            value={roomTitle}
            label="Название"
            onChange={(e) => setRoomTitle(e.target.value)}
          />
        </div>
        <Button onClick={onAddButtonClick}>Добавить</Button>
      </div>
    </Modal>
  );
}
