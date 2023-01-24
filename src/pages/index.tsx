import ListItem from "@/components/ListItem";
import SectionHeading from "@/components/SectionHeading";
import { createContext } from "@/server/context";
import { appRouter } from "@/server/routers/_app";
import { trpc } from "@/utils/trpc";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import Link from "next/link";

export async function getServerSideProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createContext(),
    // transformer: superjson, // optional - adds superjson serialization
  });
  await ssg.rooms.list.prefetch()
  return {
    props: {
      trpcState: ssg.dehydrate()
    }
  }
}

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
