export default function Topbar() {
  return (
    <header className="flex justify-between items-center p-4 bg-white border-b">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div>
        <input type="text" placeholder="Search..." className="border rounded p-2" />
      </div>
    </header>
  );
}
