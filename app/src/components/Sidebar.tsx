"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Sidebar() {
  const { data: session } = useSession();

  const adminLinks = (
    <>
      <li>
        <Link href="/admin/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link href="/admin/buildings">Buildings</Link>
      </li>
    </>
  );

  const managerLinks = (
    <>
      <li>
        <Link href="/manager/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link href="/manager/apartments">Apartments</Link>
      </li>
      <li>
        <Link href="/manager/dues">Dues</Link>
      </li>
      <li>
        <Link href="/manager/payments">Payments</Link>
      </li>
      <li>
        <Link href="/manager/announcements">Announcements</Link>
      </li>
      <li>
        <Link href="/manager/tickets">Tickets</Link>
      </li>
      <li>
        <Link href="/manager/expenses">Expenses</Link>
      </li>
    </>
  );

  const residentLinks = (
    <>
      <li>
        <Link href="/resident/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link href="/resident/dues">Dues</Link>
      </li>
      <li>
        <Link href="/resident/announcements">Announcements</Link>
      </li>
      <li>
        <Link href="/resident/tickets">Tickets</Link>
      </li>
      <li>
        <Link href="/resident/profile">Profile</Link>
      </li>
    </>
  );

  return (
    <aside className="w-64 h-screen p-4 bg-gray-800 text-white">
      <nav>
        <ul>
          {session?.user?.role === "admin" && adminLinks}
          {session?.user?.role === "manager" && managerLinks}
          {session?.user?.role === "resident" && residentLinks}
        </ul>
      </nav>
    </aside>
  );
}
