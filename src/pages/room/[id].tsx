import SectionHeading from "@/ui/SectionHeading";
import { trpc } from "@/utils/trpc";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { serverSideTRPC } from "@/utils/ssg";
import CleaningTable from "@/components/cleanings/CleaningTable";
import Head from "next/head";
import RoomQR from "@/components/room/RoomQR";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const ssTrpc = serverSideTRPC();
  const id = parseInt(context.params?.id as string);
  const room = await ssTrpc.rooms.byId.prefetch(id);
  return {
    props: {
      trpcState: ssTrpc.dehydrate(),
      id,
    },
  };
}

export default function Room(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { id } = props;
  const room = trpc.rooms.byId.useQuery(id);

  return (
    <>
      <Head>
        <title>{room.data?.title ?? "Комната..."}</title>
      </Head>
      <div className="container mx-auto">
        {room.isLoading ? (
          <SectionHeading heading="Комната..." />
        ) : (
          <RoomHeading title={room.data!.title} />
        )}
        <main className="m-4 flex flex-col justify-center gap-2 md:mx-auto md:w-2/3">
          <CleaningTable roomId={id} cleanings={room.data?.cleanings || []} />
          <h2 className="text-lg font-medium">QR-код</h2>
          <RoomQR roomId={id} />
        </main>
      </div>
    </>
  );
}

function RoomHeading({ title }: { title: string }) {
  return (
    <header className="border-b p-3 md:px-0">
      <div className="mx-auto md:w-2/3">
        <Link className="flex items-center gap-2" href="/">
          <ArrowLeftIcon className="h-5 w-5" />
          <h1 className="text-2xl font-semibold">{title}</h1>
        </Link>
      </div>
    </header>
  );
}
