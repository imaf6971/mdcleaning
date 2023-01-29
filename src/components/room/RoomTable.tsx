import { trpc } from "@/utils/trpc";
import { useState } from "react";
import BasicTable from "@/components/BasicTable";
import RoomItem from "./RoomItem";
import AddRoomModal from "./AddRoomModal";

type Room = {
  id: number;
  title: string;
};

type RoomTableProps = {
  rooms: Room[];
};

export default function RoomTable({ rooms }: RoomTableProps) {
  const utils = trpc.useContext();
  const deleteRoom = trpc.rooms.deleteById.useMutation({
    onSuccess() {
      utils.rooms.list.invalidate();
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  function roomLinks() {
    return rooms.map((room) => (
      <RoomItem
        isEditing={isEditing}
        onRedo={() => {}}
        onDelete={() => handleRoomDeleteClick(room.id)}
        id={room.id}
        title={room.title}
        key={room.id}
      />
    ));
  }

  function handleRoomDeleteClick(roomId: number) {
    deleteRoom.mutate(roomId);
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
        heading="1 этаж"
        items={roomLinks}
        isEditing={isEditing}
        onAddClick={handleAddRoomClick}
        onChangeClick={handleEditRoomClick}
      />
      <AddRoomModal isVisible={isAdding} onClose={() => setIsAdding(false)} />
    </>
  );
}

