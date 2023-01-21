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

      </div>
    </main>

  )
}