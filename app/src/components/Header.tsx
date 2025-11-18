"use client";

import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div>
        <h1 className="text-xl font-bold">Apartment Management</h1>
      </div>
      <div className="flex items-center space-x-4">
        <p>Welcome, {session?.user?.name}</p>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
