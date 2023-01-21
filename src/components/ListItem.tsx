export default function ListItem({ children }: {children: string}) {
  return (
    <div className="border rounded-md p-3 hover:shadow transition-shadow">
      {children}
    </div>
  );
}