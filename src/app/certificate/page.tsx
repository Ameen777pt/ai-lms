"use client";

import { useSearchParams } from "next/navigation";

export default function CertificatePage() {
  const searchParams = useSearchParams();

  const courseTitle =
    searchParams.get("course") || "";

  const userEmail =
    localStorage.getItem("userEmail") || "";

  return (
    <div className="p-10 print:p-0">
      <div
  style={{
    border: "8px solid #d4af37",
    padding: "40px",
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
    borderRadius: "16px",
  }}
>
       <h1
  style={{
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "20px",
  }}
>
  Certificate of Completion
</h1>
       <p className="mt-4">
  Certificate No:
  CERT-{courseTitle.replace(/\s+/g, "-").toUpperCase()}
</p>


        <p className="mt-8">
          Awarded to
        </p>

        <h2
  style={{
    fontSize: "32px",
    fontWeight: "bold",
    marginTop: "10px",
  }}
>
  {userEmail}
</h2>

        <p className="mt-8">
          For successfully completing
        </p>

        <h2 className="text-3xl font-bold mt-2">
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