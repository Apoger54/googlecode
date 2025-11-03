import StatsCard from "@/components/ui/StatsCard";
import DataTable from "@/components/ui/DataTable";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Business Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatsCard title="Total Orders" value="1,234" />
        <StatsCard title="Total Printed Tickets" value="12,345" />
        <StatsCard title="Total Validated Tickets" value="9,876" />
      </div>
      <DataTable />
    </div>
  );
}
