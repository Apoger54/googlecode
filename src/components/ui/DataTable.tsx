export default function DataTable() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Data Table</h3>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Column 1</th>
            <th className="text-left p-2">Column 2</th>
            <th className="text-left p-2">Column 3</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">Row 1, Cell 1</td>
            <td className="p-2">Row 1, Cell 2</td>
            <td className="p-2">Row 1, Cell 3</td>
          </tr>
          <tr className="border-b">
            <td className="p-2">Row 2, Cell 1</td>
            <td className="p-2">Row 2, Cell 2</td>
            <td className="p-2">Row 2, Cell 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
