import Staff from "@/pages/staff/[id]";
import { trpc } from "@/utils/trpc";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import AddCleaningModal from "./AddCleaningModal";
import BasicTable from "../BasicTable";

type Staff = {
  firstName: string;
  lastName: string;
};

type Cleaning = {
  id: number;
  from: string;
  to: string;
  cleaner: Staff;
};

type CleaningTableProps = {
  roomId: number;
  cleanings: Cleaning[];
};

export default function CleaningTable({
  roomId,
  cleanings,
}: CleaningTableProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddCleaningModal, setShowAddCleaningModal] = useState(false);

  const utils = trpc.useContext();
  const deleteCleaning = trpc.cleaningPlan.deleteById.useMutation({
    onSuccess: () => {
      utils.rooms.findById.invalidate(roomId);
    },
  });

  function handleCleaningDelete(id: number) {
    deleteCleaning.mutate(id);
  }

  function handleOnChangeClick() {
    setIsEditing((prev) => !prev);
  }

  function handleOnAddClick() {
    setShowAddCleaningModal(true);
  }

  function cleaningItems() {
    return cleanings.map((cleaning, idx) => (
      <div
        key={cleaning.id}
        className="flex w-full items-center justify-between rounded-md border p-3 transition-shadow hover:shadow"
      >
        <div className="">{idx + 1}.</div>
        <div className="">{`${cleaning.from} - ${cleaning.to}`}</div>
        <div className="">
          {cleaning.cleaner.firstName} {cleaning.cleaner.lastName[0]}.
        </div>
        {isEditing && (
          <button
            onClick={() => handleCleaningDelete(cleaning.id)}
            className="rounded-md border p-1 hover:cursor-pointer"
          >
            <TrashIcon className="h-6" />
          </button>
        )}
      </div>
    ));
  }

  return (
    <>
      <BasicTable
        items={cleaningItems}
        onAddClick={handleOnAddClick}
        isEditing={isEditing}
        onChangeClick={handleOnChangeClick}
        heading="???????????? ????????????"
      />
      {showAddCleaningModal && (
        <AddCleaningModal
          roomId={roomId}
          onClose={() => {
            setShowAddCleaningModal(false);
          }}
        />
      )}
    </>
  );
}
