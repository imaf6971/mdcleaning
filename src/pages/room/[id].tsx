import SectionHeading from "@/components/SectionHeading";
import { useRouter } from "next/router";

export default function Room() {
  const router = useRouter()
  const { id } = router.query

  return (
    <main className="container mx-auto">
      {id !== undefined
        ? <SectionHeading heading={`Комната ${id}`} />
        : <SectionHeading heading="Комната" />}
      <div className="flex flex-col gap-2 m-4 justify-center">
        <h2 className="text-lg font-medium">График уборки</h2>
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
        
      </div>
    </main>

  )
}