import { ChangeEvent, MouseEventHandler, MouseEvent, useState } from "react"
import Button from "./Button"
import TimeInput from "./TimeInput"

// TODO: add validation, semantic HTML and server handling
export default function AddCleaningForm() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  function handleToTimeInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTo(e.target.value)
  }

  function handleFromTimeInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFrom(e.target.value)
  }

  function onAddButtonClick() {
    
  }

  return (
    <div className="p-2 flex flex-col gap-2">
      <h2 className="text-lg font-medium mb-2">Назначить уборку</h2>
      <div className="flex justify-between">
        <div className="basis-1/2 flex justify-around items-center">
          <span>C:</span>
          <TimeInput value={from} onChange={handleFromTimeInputChange} />
        </div>
        <div className="basis-1/2 flex justify-around items-center">
          <span>По:</span>
          <TimeInput value={to} onChange={handleToTimeInputChange}/>
        </div>
      </div>
      <Button onClick={onAddButtonClick}>Добавить</Button>
    </div>
  )
}