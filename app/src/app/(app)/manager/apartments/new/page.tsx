"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewApartmentPage() {
  const [doorNo, setDoorNo] = useState("");
  const [floor, setFloor] = useState(0);
  const [label, setLabel] = useState("");
  const [defaultMonthlyDues, setDefaultMonthlyDues] = useState(0);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/apartments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doorNo,
        floor,
        label,
        defaultMonthlyDues,
      }),
    });
    router.push("/manager/apartments");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Add New Apartment</h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="doorNo"
            className="block text-sm font-medium text-gray-700"
          >
            Door No
          </label>
          <input
            id="doorNo"
            name="doorNo"
            type="text"
            required
            value={doorNo}
            onChange={(e) => setDoorNo(e.target.value)}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="floor"
            className="block text-sm font-medium text-gray-700"
          >
            Floor
          </label>
          <input
            id="floor"
            name="floor"
            type="number"
            required
            value={floor}
            onChange={(e) => setFloor(Number(e.target.value))}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="label"
            className="block text-sm font-medium text-gray-700"
          >
            Label
          </label>
          <input
            id="label"
            name="label"
            type="text"
            required
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="defaultMonthlyDues"
            className="block text-sm font-medium text-gray-700"
          >
            Default Monthly Dues
          </label>
          <input
            id="defaultMonthlyDues"
            name="defaultMonthlyDues"
            type="number"
            required
            value={defaultMonthlyDues}
            onChange={(e) => setDefaultMonthlyDues(Number(e.target.value))}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Apartment
          </button>
        </div>
      </form>
    </div>
  );
}
