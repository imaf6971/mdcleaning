import BasicTable from "@/components/BasicTable";
import AddStaffModal from "@/components/staff/AddStaffModal";
import ListItem from "@/ui/ListItem";
import Navbar from "@/ui/Navbar";
import SectionHeading from "@/ui/SectionHeading";
import { serverSideTRPC } from "@/utils/ssg";
import { trpc } from "@/utils/trpc";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export async function getServerSideProps() {
  const ssTrpc = serverSideTRPC();
  await ssTrpc.cleaners.list.prefetch();
  return {
    props: {
      trpcState: ssTrpc.dehydrate(),
    },
  };
}

export default function StaffIndex() {
  const staff = trpc.cleaners.list.useQuery();

  return (
    <>
      <Head>
        <title>Сотрудники</title>
      </Head>
      <Navbar />
      <div className="container mx-auto">
        <SectionHeading heading="Сотрудники" />
        {staff.isSuccess && (
          <main className="m-4 flex flex-col justify-center gap-2 md:mx-auto md:w-2/3">
            <StaffTable staff={staff.data} />
          </main>
        )}
        {staff.isLoading && <div>Loading...</div>}
      </div>
    </>
  );
}

type Staff = {
  id: number;
  firstName: string;
  lastName: string;
};

type StaffTableProps = {
  staff: Staff[];
};

function StaffTable({ staff }: StaffTableProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  function handleAddClick() {
    setIsAdding(true);
  }

  function handleChangeClick() {
    setIsEditing((prev) => !prev);
  }

  function staffItems() {
    return staff.map((staff) => (
      <Link key={staff.id} href={`/room/${staff.id}`} className="min-w-full">
        <ListItem>
          {staff.firstName} {staff.lastName}
        </ListItem>
      </Link>
    ));
  }

  return (
    <>
      <BasicTable
        items={staffItems}
        isEditing={isEditing}
        onAddClick={handleAddClick}
        onChangeClick={handleChangeClick}
      />
      {isAdding && <AddStaffModal onClose={() => setIsAdding(false)} />}
    </>
  );
}
