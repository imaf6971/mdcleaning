import RoomTable from "@/components/RoomTable";
import SectionHeading from "@/components/SectionHeading";
import { ssg } from "@/utils/ssg";
import { trpc } from "@/utils/trpc";

export async function getServerSideProps() {
  const ssTrpc = ssg();
  await ssTrpc.rooms.list.prefetch();
  return {
    props: {
      trpcState: ssTrpc.dehydrate(),
    },
  };
}

// TODO: add navigation, login screen and animations
export default function Home() {
  const rooms = trpc.rooms.list.useQuery();

  return (
    <main className="container mx-auto">
      <SectionHeading heading="Комнаты" />
      {rooms.isSuccess && <RoomTable rooms={rooms.data} />}
    </main>
  );
}
