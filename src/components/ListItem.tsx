export default function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="border rounded-md p-3 hover:shadow transition-shadow">
      {children}
    </div>
  );
}
