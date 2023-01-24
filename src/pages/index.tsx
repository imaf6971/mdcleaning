import ListItem from "@/components/ListItem";
import SectionHeading from "@/components/SectionHeading";
import { ssg } from "@/utils/ssg";
import {  trpc } from "@/utils/trpc";
import Link from "next/link";

export async function getServerSideProps() {
  const ssTrpc = ssg()
  await ssTrpc.rooms.list.prefetch();
  return {
    props: {
      trpcState: ssTrpc.dehydrate(),
    },
  };
}

export default function Home() {
  const rooms = trpc.rooms.list.useQuery();

  return (
    <main className="container mx-auto">
      <SectionHeading heading="Комнаты" />
      <div className="md:w-2/3 mx-auto">
        <div className="flex flex-col gap-2 m-4 justify-center items-center">
          {rooms.data?.map((room) => (
            <Link key={room.id} href={`/room/${room.id}`} className="min-w-full">
              <ListItem>{room.title}</ListItem>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
