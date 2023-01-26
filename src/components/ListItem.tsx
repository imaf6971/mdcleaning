export default function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border p-3 transition-shadow hover:shadow">
      {children}
    </div>
  );
}
