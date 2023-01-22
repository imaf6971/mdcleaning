import AddCleaningForm from "@/components/AddCleaningForm";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import SectionHeading from "@/components/SectionHeading";
import { useQRCode } from "next-qrcode";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Room() {
  const router = useRouter()
  const { id } = router.query

  const { Image } = useQRCode()

  const [showAddCleaningModal, setShowAddCleaningModal] = useState(false)

  return (
    <main className="container mx-auto">
      {id !== undefined
        ? <SectionHeading heading={`Комната ${id}`} />
        : <SectionHeading heading="Комната" />}
      <div className="flex flex-col gap-2 m-4 justify-center">
        <div className="flex justify-between">
          <h2 className="text-lg font-medium">График уборки</h2>
          <Button onClick={() => setShowAddCleaningModal(true)}>Добавить</Button>
        </div>
        <div className="flex flex-col border rounded-md divide-y">
          <div className="flex justify-between items-center p-3 hover:shadow transition-shadow">
            <div className="basis-1/6">1.</div>
            <div className="basis-2/6">12:30 - 13:30</div>
            <div className="basis-3/6">Фамилия Имя</div>
          </div>
          <div className="flex justify-between items-center p-3 hover:shadow transition-shadow">
            <div className="basis-1/6">1.</div>
            <div className="basis-2/6">12:30 - 13:30</div>
            <div className="basis-3/6">Фамилия Имя</div>
          </div>
        </div>
        <h2 className="text-lg font-medium">QR-код</h2>
        <Image
          alt="qr"
          text="abc"
          options={{
            type: 'image/jpeg',
            quality: 1,
            level: 'L',
            margin: 3,
            width: 200,
          }}
        />
      </div>
      <Modal
        isVisible={showAddCleaningModal}
        onClose={() => setShowAddCleaningModal(false)}
      >
        <AddCleaningForm />
      </Modal>
    </main>

  )
}