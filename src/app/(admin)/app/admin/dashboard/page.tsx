import StatsCard from "@/components/ui/StatsCard";
import DataTable from "@/components/ui/DataTable";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Orders" value="5,678" />
        <StatsCard title="Pending Print Jobs" value="123" />
        <StatsCard title="Shipped Orders" value="5,432" />
        <StatsCard title="Total Revenue" value="$123,456" />
      </div>
      <DataTable />
    </div>
  );
}
