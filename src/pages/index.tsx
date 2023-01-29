import RoomTable from "@/components/room/RoomTable";
import SectionHeading from "@/ui/SectionHeading";
import { serverSideTRPC } from "@/utils/ssg";
import { trpc } from "@/utils/trpc";
import Head from "next/head";

export async function getServerSideProps() {
  const ssTrpc = serverSideTRPC();
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
    <>
      <Head>
        <title>Комнаты</title>
      </Head>
      <div className="container mx-auto">
        <SectionHeading heading="Комнаты" />
        {rooms.isSuccess && (
          <main className="m-4 flex flex-col justify-center gap-2 md:mx-auto md:w-2/3">
            <RoomTable rooms={rooms.data} />
          </main>
        )}
        {rooms.isLoading && <div>Loading...</div>}
      </div>
    </>
  );
}
