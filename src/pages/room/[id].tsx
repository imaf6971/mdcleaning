import AddCleaningModal from "@/components/AddCleaningForm";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import { createContext } from "@/server/context";
import { appRouter } from "@/server/routers/_app";
import { trpc } from "@/utils/trpc";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useQRCode } from "next-qrcode";
import { useState } from "react";


export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>,
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createContext(),
    // transformer: superjson, // optional - adds superjson serialization
  });
  const id = parseInt(context.params?.id as string);
  await ssg.rooms.byId.prefetch(id)
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}

export default function Room(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { id } = props
  const room = trpc.rooms.byId.useQuery(id);
  const deleteCleaning = trpc.cleanings.deleteById.useMutation();

  const { Image } = useQRCode()

  const [showAddCleaningModal, setShowAddCleaningModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  function handleCleaningDelete(id: number) {
    deleteCleaning.mutateAsync(id)
      .then(() => room.refetch());
  }

  return (
    <main className="container mx-auto">
      {room.isLoading
        ? <SectionHeading heading="Комната..." />
        : <SectionHeading heading={room.data!.title} />}
      <div className="flex flex-col gap-2 m-4 justify-center">
        <div className="flex justify-between">
          <h2 className="text-lg font-medium">График уборки</h2>
          <div className="flex gap-2">
            {isEditing
              ? <Button onClick={() => setIsEditing(false)}>Отмена</Button>
              : <Button onClick={() => setIsEditing(true)}>Изменить</Button>}
            <Button onClick={() => setShowAddCleaningModal(true)}>Добавить</Button>
          </div>
        </div>
        <div className="flex flex-col border rounded-md divide-y">
          {room.data!.cleanings.map((cleaning, idx) =>
            <div key={cleaning.id} className="flex justify-between items-center p-3 hover:shadow transition-shadow">
              <div className="basis-1/6">{idx + 1}.</div>
              <div className="basis-2/6">{cleaning.from} - {cleaning.to}</div>
              <div className="basis-3/6">Фамилия Имя</div>
              {isEditing && <Button onClick={() => handleCleaningDelete(cleaning.id)}>X</Button>}
            </div>
          )}
        </div>
        <h2 className="text-lg font-medium">QR-код</h2>
        <Image
          alt="qr"
          text="abc"
          options={{
            type: 'image/jpeg',
            quality: 1,
            level: 'L',
            margin: 3,
            width: 200,
          }}
        />
      </div>
      <AddCleaningModal roomId={id} isVisible={showAddCleaningModal}
        onClose={() => {
          setShowAddCleaningModal(false)
          room.refetch()
        }} />
    </main>

  )
}