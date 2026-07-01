"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function CertificateButton({
  courseSlug,
  courseTitle,
}: {
  courseSlug: string;
  courseTitle: string;
}) {
  const router = useRouter();
  const { userEmail } = useAuth();

  const handleCertificate = async () => {
    if (!userEmail) return;

    const response = await fetch("/api/certificates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        courseSlug,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.error);
      return;
    }

    router.push(
      `/certificate?slug=${encodeURIComponent(courseSlug)}`
    );
  };

  return (
    <button
      onClick={handleCertificate}
      style={{
        backgroundColor: "#eab308",
        color: "black",
        padding: "12px 24px",
        borderRadius: "8px",
        fontWeight: "bold",
      }}
    >
      Get Certificate
    </button>
  );
}