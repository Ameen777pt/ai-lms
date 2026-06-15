"use client";
import { useRouter } from "next/navigation";

export default function CertificateButton({
  courseTitle,
}: {
  courseTitle: string;
}) {
    const router = useRouter();
  const handleCertificate = () => {
  router.push(
    `/certificate?course=${encodeURIComponent(
      courseTitle
    )}`
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