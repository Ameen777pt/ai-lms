"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function RecentlyViewedTracker({
  courseSlug,
}: {
  courseSlug: string;
}) {
  const { userEmail, isLoggedIn, loading } =
    useAuth();

  useEffect(() => {
    if (
      loading ||
      !isLoggedIn ||
      !userEmail
    ) {
      return;
    }

    fetch("/api/recently-viewed", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        courseSlug,
      }),
    });
  }, [
    courseSlug,
    userEmail,
    isLoggedIn,
    loading,
  ]);

  return null;
}