"use client";
import Link from "next/link";

import { useEffect, useState } from "react";

type Props = {
  lessonId: string;
  nextLessonUrl: string | null;
};

export default function CompleteLessonButton({
  lessonId,
  nextLessonUrl,
}: Props) {
  const [isCompleted, setIsCompleted] =
    useState(false);

  useEffect(() => {
    const completedLessons = JSON.parse(
      localStorage.getItem("completedLessons") ||
        "[]"
    );

    if (
      completedLessons.includes(lessonId)
    ) {
      setIsCompleted(true);
    }
  }, [lessonId]);

  const handleComplete = () => {
    const completedLessons = JSON.parse(
      localStorage.getItem("completedLessons") ||
        "[]"
    );

    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);

      localStorage.setItem(
        "completedLessons",
        JSON.stringify(completedLessons)
      );

      setIsCompleted(true);
    }
  };

  const handleIncomplete = () => {
  const completedLessons = JSON.parse(
    localStorage.getItem("completedLessons") ||
      "[]"
  );

  const updatedLessons =
    completedLessons.filter(
      (id: string) => id !== lessonId
    );

  localStorage.setItem(
    "completedLessons",
    JSON.stringify(updatedLessons)
  );

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