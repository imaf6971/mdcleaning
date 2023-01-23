import { trpc } from "@/utils/trpc"
import { ChangeEvent, useState } from "react"
import Button from "./Button"
import Modal from "./Modal"
import TimeInput from "./TimeInput"

type AddCleaningModalProps = {
  roomId: number
  isVisible: boolean;
  onClose: () => void;
}

// TODO: add validation and semantic HTML
export default function AddCleaningModal({ roomId, isVisible, onClose }: AddCleaningModalProps) {
  const addCleaning = trpc.rooms.addCleaning.useMutation()
  const [from, setFrom] = useState('11:00')
  const [to, setTo] = useState('12:00')

  function handleToTimeInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTo(e.target.value)
  }

  function handleFromTimeInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFrom(e.target.value)
  }

  function onAddButtonClick() {
    addCleaning.mutate({ roomId, from, to })
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="p-2 flex flex-col gap-2">
        <h2 className="text-lg font-medium mb-2">Назначить уборку</h2>
        <div className="flex justify-between">
          <div className="basis-1/2 flex justify-around items-center">
            <span>C:</span>
            <TimeInput value={from} onChange={handleFromTimeInputChange} />
          </div>
          <div className="basis-1/2 flex justify-around items-center">
            <span>По:</span>
            <TimeInput value={to} onChange={handleToTimeInputChange} />
          </div>
        </div>
        <Button onClick={onAddButtonClick}>Добавить</Button>
      </div>
    </Modal>
  )
}