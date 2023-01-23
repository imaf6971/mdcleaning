import ListItem from "@/components/ListItem";
import SectionHeading from "@/components/SectionHeading";
import { trpc } from "@/utils/trpc";
import Link from "next/link";

export default function Home() {
  const rooms = trpc.rooms.list.useQuery()

  return (
    <main className="container mx-auto">
      <SectionHeading heading="Комнаты" />
      <div className="flex flex-col gap-2 m-4 justify-center items-center">
        {rooms.data?.map(room =>
          <Link key={room.id} href={`/room/${room.id}`} className="w-full">
            <ListItem>{room.title}</ListItem>
          </Link>
        )}
      </div>
    </main>
  )
}
