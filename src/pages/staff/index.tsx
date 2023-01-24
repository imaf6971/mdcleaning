import ListItem from "@/components/ListItem";
import SectionHeading from "@/components/SectionHeading";
import { trpc } from "@/utils/trpc";
import Head from "next/head";
import Link from "next/link";

export default function StaffIndex() {
  const staff = trpc.staff.list.useQuery();

  return (
    <main className="container mx-auto">
      <SectionHeading heading="Сотрудники" />
      <div className="md:w-2/3 mx-auto">
        <div className="flex flex-col gap-2 m-4 justify-center items-center">
          {staff.data?.map((staff) => (
            <Link
              key={staff.id}
              href={`/staff/${staff.id}`}
              className="min-w-full"
            >
              <ListItem>{staff.firstName} {staff.lastName}</ListItem>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
