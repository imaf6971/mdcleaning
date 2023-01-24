export default function SectionHeading({ heading }: { heading: string }) {
  return (
    <header className="text-2xl font-semibold border-b p-4">{heading}</header>
  );
}
