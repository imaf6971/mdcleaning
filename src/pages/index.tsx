import ListItem from "@/components/ListItem";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto">
      <SectionHeading heading="Комнаты" />
      <div className="flex flex-col gap-2 m-4 justify-center items-center">
        <Link href="/room/1" className="w-full">
          <ListItem>Комната 1</ListItem>
        </Link>
        <Link href="/" className="w-full">
          <ListItem>Комната 1</ListItem>
        </Link>
        <Link href="/" className="w-full">
          <ListItem>Комната 1</ListItem>
        </Link>
      </div>
    </main>
  )
}
