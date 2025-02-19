"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminGuard = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && (!session || !session.user.isAdmin)) {
      router.push("/login"); // Ha nincs jogosultság, átirányítás
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // Betöltés közben jelenjen meg valami
  }

  return session && session.user.isAdmin ? children : null;
};

export default AdminGuard;
