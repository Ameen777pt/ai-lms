"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
 const router = useRouter();
const { isLoggedIn, loading } = useAuth();

useEffect(() => {
  if (!loading && !isLoggedIn) {
    router.push("/login");
  }
}, [loading, isLoggedIn, router]);

if (loading) {
  return null;
}

if (!isLoggedIn) {
  return null;
}

return <>{children}</>;
}