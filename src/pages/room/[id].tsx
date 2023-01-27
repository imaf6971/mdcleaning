import AddCleaningModal from "@/components/AddCleaningForm";
import Button from "@/components/Button";
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
    <main className="container mx-auto">
      {room.isLoading ? (
        <SectionHeading heading="Комната..." />
      ) : (
        <RoomHeading title={room.data!.title} />
      )}
      <div className="m-4 flex flex-col justify-center gap-2 md:mx-auto md:w-2/3">
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
      </div>
    </main>
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

function CleaningTable({
  roomId,
  cleanings,
}: {
  roomId: number;
  cleanings: Cleaning[];
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddCleaningModal, setShowAddCleaningModal] = useState(false);

  const utils = trpc.useContext();
  const deleteCleaning = trpc.cleanings.deleteById.useMutation({
    onSuccess: () => {
      utils.rooms.byId.invalidate(roomId);
    },
  });

  function handleCleaningDelete(id: number) {
    deleteCleaning.mutate(id);
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">График уборки</h2>
        <div className="flex gap-2">
          {isEditing ? (
            <Button onClick={() => setIsEditing(false)}>Отмена</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Изменить</Button>
          )}
          <Button onClick={() => setShowAddCleaningModal(true)}>
            Добавить
          </Button>
        </div>
      </div>
      <div className="flex flex-col divide-y rounded-md border">
        {cleanings.map((cleaning, idx) => (
          <div
            key={cleaning.id}
            className="flex items-center justify-between p-3 transition-shadow hover:shadow"
          >
            <div className="basis-1/6">{idx + 1}.</div>
            <div className="basis-2/6">
              {cleaning.from.toLocaleTimeString("ru-RU")} -{" "}
              {cleaning.to.toLocaleTimeString("ru-RU")}
            </div>
            <div className="basis-3/6">Фамилия Имя</div>
            {isEditing && (
              <button
                onClick={() => handleCleaningDelete(cleaning.id)}
                className="rounded-md border p-1 hover:cursor-pointer"
              >
                <TrashIcon className="h-6" />
              </button>
            )}
          </div>
        ))}
      </div>
      <AddCleaningModal
        roomId={roomId}
        isVisible={showAddCleaningModal}
        onClose={() => {
          setShowAddCleaningModal(false);
        }}
      />
    </>
  );
}
