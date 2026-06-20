"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CertificateContent() {
  const searchParams = useSearchParams();

  const courseTitle =
    searchParams.get("course") || "";

  const userEmail =
    localStorage.getItem("userEmail") || "";

  return (
    <div className="p-10 print:p-0">
     <div
  className="w-full max-w-4xl mx-auto p-5 md:p-10 rounded-2xl text-center"
  style={{
    border: "8px solid #d4af37",
  }}
>
       <h1 className="text-4xl md:text-6xl font-bold">
  Certificate of Completion
</h1>
       <p className="mt-4 break-words">
  Certificate No:
  CERT-{courseTitle.replace(/\s+/g, "-").toUpperCase()}
</p>


        <p className="mt-8">
          Awarded to
        </p>

        <h2
  className="text-2xl md:text-4xl font-bold mt-2 break-words"
>
  {userEmail}
</h2>

        <p className="mt-8">
          For successfully completing
        </p>

        <h2 className="text-2xl md:text-4xl font-bold mt-2 break-words">
  {courseTitle}
</h2>

        <p className="mt-8">
  Issued on:
  {new Date().toLocaleDateString()}
</p>

<button
  id="printButton"
  onClick={() => {
    const button =
      document.getElementById("printButton");

    if (button) {
      button.style.display = "none";
    }

    window.print();

    setTimeout(() => {
      if (button) {
        button.style.display = "block";
      }
    }, 1000);
  }}
  style={{
    backgroundColor: "#2563eb",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "bold",
    marginTop: "20px",
    display: "inline-block",
  }}
>
  Download / Print Certificate
</button>
<div style={{ marginTop: "40px" }}>
  <p>_____________________</p>
  <p>LMS Instructor</p>
</div>

        <p className="mt-10">
          🏆 Congratulations!
        </p>
      </div>
    </div>
  );
}

export default function CertificatePage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CertificateContent />
    </Suspense>
  );
}