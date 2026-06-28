"use client";
import Link from "next/link";

import { useEffect, useState } from "react";

type Props = {
  courseSlug: string;
  lessonSlug: string;
  nextLessonUrl: string | null;
};

export default function CompleteLessonButton({
  courseSlug,
  lessonSlug,
  nextLessonUrl,
}: Props) {
  const [isCompleted, setIsCompleted] =
    useState(false);

    const lessonId = `${courseSlug}/${lessonSlug}`;

  useEffect(() => {
  async function checkLessonProgress() {
    const email = localStorage.getItem("userEmail");

    if (!email) return;

    const response = await fetch(
      `/api/lesson-progress?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) return;

    const progress = await response.json();

    setIsCompleted(
      progress.some(
        (lesson: {
          courseSlug: string;
          lessonSlug: string;
        }) =>
          lesson.courseSlug === courseSlug &&
          lesson.lessonSlug === lessonSlug
      )
    );
  }

  checkLessonProgress();
}, [courseSlug, lessonSlug]);

  const handleComplete = async () => {
  const email = localStorage.getItem("userEmail");

  const response = await fetch("/api/lesson-progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      courseSlug,
      lessonSlug,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    alert(data.error);
    return;
  }

  setIsCompleted(true);
};

 const handleIncomplete = async () => {
  const email = localStorage.getItem("userEmail");

  const response = await fetch("/api/lesson-progress", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      courseSlug,
      lessonSlug,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    alert(data.error);
    return;
  }

  setIsCompleted(false);
};

return (
  <div className="mt-6 flex gap-4">
    <button
      onClick={
        isCompleted
          ? handleIncomplete
          : handleComplete
      }
      className="px-6 py-3 bg-green-600 text-white rounded-lg"
    >
      {isCompleted
        ? "Mark Incomplete"
        : "Mark Complete"}
    </button>

    
  </div>
);
}