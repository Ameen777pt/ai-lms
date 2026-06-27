"use client";

import { useEffect, useState } from "react";

type Props = {
  courseSlug: string;
};

export default function EnrollButton({
  courseSlug,
}: Props) {
  const [isEnrolled, setIsEnrolled] =
    useState(false);

  useEffect(() => {
  async function checkEnrollment() {
    const email = localStorage.getItem("userEmail");

    if (!email) return;

    const response = await fetch(
      `/api/enrollments?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) return;

    const enrollments = await response.json();

    setIsEnrolled(
      enrollments.some(
        (enrollment: {
          courseSlug: string;
        }) =>
          enrollment.courseSlug === courseSlug
      )
    );
  }

  checkEnrollment();
}, [courseSlug]);

 const handleEnroll = async () => {
   

    if (!isEnrolled) {
     const userEmail = localStorage.getItem("userEmail");

const response = await fetch("/api/enrollments", {
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

const notifications = JSON.parse(
  localStorage.getItem("notifications") || "[]"
);

notifications.unshift(`Enrolled in ${courseSlug}`);

if (!isEnrolled) {
  notifications.unshift(
    "🏅 Achievement Unlocked: First Enrollment"
  );
}

localStorage.setItem(
  "notifications",
  JSON.stringify(notifications)
);

setIsEnrolled(true);
    }
  };
 const handleUnenroll = async () => {
  const email = localStorage.getItem("userEmail");

  const response = await fetch("/api/enrollments", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      courseSlug,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    alert(data.error);
    return;
  }

  setIsEnrolled(false);
};

  return (
    <button
  onClick={
    isEnrolled
      ? handleUnenroll
      : handleEnroll
  }
  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
>
  {isEnrolled
    ? "Unenroll Course"
    : "Enroll Course"}
</button>
  );
}