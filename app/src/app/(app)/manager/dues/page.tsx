"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DuesPage() {
  const [month, setMonth] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [duesItems, setDuesItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchDuesItems();
  }, []);

  const fetchDuesItems = async () => {
    const res = await fetch("/api/dues");
    const data = await res.json();
    setDuesItems(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/dues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ month, title, amount }),
    });
    fetchDuesItems();
    router.refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dues Management</h2>
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Create Dues Period
          </button>
        </form>
      </div>

      <div className="mt-4">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Apartment</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {duesItems.map((item: any) => (
              <tr key={item.id}>
                <td className="px-4 py-2 border">{item.apartment.doorNo}</td>
                <td className="px-4 py-2 border">${item.amount}</td>
                <td className="px-4 py-2 border">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
