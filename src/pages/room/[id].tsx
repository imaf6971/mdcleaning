import AddCleaningModal from "@/components/AddCleaningModal";
import Button from "@/ui/Button";
import SectionHeading from "@/components/SectionHeading";
import { trpc } from "@/utils/trpc";
import { Cleaning } from "@prisma/client";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useQRCode } from "next-qrcode";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { serverSideTRPC } from "@/utils/ssg";
import BasicTable from "@/components/BasicTable";
import CleaningTable from "@/components/CleaningTable";
import Head from "next/head";

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

  const { Image } = useQRCode();

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
        <Image
          alt="qr"
          text="abc"
          options={{
            type: "image/jpeg",
            quality: 1,
            level: "L",
            margin: 3,
            width: 200,
          }}
        />
      </main>
    </div>
    </>
  );
}

function RoomHeading({ title }: { title: string }) {
  return (
    <header className="border-b py-3">
      <div className="mx-auto md:w-2/3">
        <Link className="flex items-center gap-2" href="/">
          <ArrowLeftIcon className="h-5 w-5" />
          <h1 className="text-2xl font-semibold">{title}</h1>
        </Link>
      </div>
    </header>
  );
}

