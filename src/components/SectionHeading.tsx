export default function SectionHeading({ heading }: { heading: string }) {
  return (
    <div className="p-3 border-b">
      <div className="md:w-2/3 mx-auto">
      <header className="text-2xl font-semibold">{heading}</header>
      </div>
    </div>
  );
}
