"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/login");
    } else {
      switch (session.user?.role) {
        case "admin":
          router.push("/admin/dashboard");
          break;
        case "manager":
          router.push("/manager/dashboard");
          break;
        case "resident":
          router.push("/resident/dashboard");
          break;
        default:
          router.push("/login");
          break;
      }
    }
  }, [session, status, router]);

  return <div>Loading...</div>;
}
