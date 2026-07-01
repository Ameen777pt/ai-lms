"use client";
import CertificateButton from "./CertificateButton";

import { useEffect, useState } from "react";
import Link from "next/link";

type Lesson = {
  slug: string;
  title: string;
  duration: string;
  completed: boolean;
  content: string;
};

export default function CourseContent({
  lessons,
  courseSlug,
  courseTitle,
}: {
  lessons: Lesson[];
  courseSlug: string;
  courseTitle: string;
}){
  const [completedLessonIds, setCompletedLessonIds] =
    useState<string[]>([]);

useEffect(() => {
  async function loadLessonProgress() {
    const email = localStorage.getItem("userEmail");

    if (!email) return;

    const response = await fetch(
      `/api/lesson-progress?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) return;

    const progress = await response.json();

    const completedIds = progress.map(
      (lesson: {
        courseSlug: string;
        lessonSlug: string;
      }) =>
        `${lesson.courseSlug}/${lesson.lessonSlug}`
    );

    setCompletedLessonIds(completedIds);
  }

  loadLessonProgress();
}, []);



  const completedLessons = lessons.filter(
  (lesson) =>
    completedLessonIds.includes(
      `${courseSlug}/${lesson.slug}`
    )
).length;

const progress = Math.round(
  (completedLessons / lessons.length) * 100
);

  return (
    <div>
      <p className="mt-2 font-semibold">
        Progress: {progress}%
      </p>

      <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {progress === 100 && (
  <>
    <p className="text-green-600 font-bold mt-4">
      🏆 Course Completed!
    </p>

    <CertificateButton
  courseSlug={courseSlug}
  courseTitle={courseTitle}
/>
  </>
)}

      <div className="space-y-3 mt-6">
        {lessons.map((lesson, index) => (
          <div
            key={lesson.title}
            className="border p-4 rounded-lg"
          >
           <Link href={`/courses/${courseSlug}/${lesson.slug}`}>
  <h3 className="text-white font-bold">
  Lesson {index + 1}: {lesson.title}
</h3>
</Link>

            <p>Duration: {lesson.duration}</p>

            <p
  className={
    completedLessonIds.includes(
      `${courseSlug}/${lesson.slug}`
    )
      ? "text-green-600"
      : "text-orange-500"
  }
>
  Status:{" "}
  {completedLessonIds.includes(
    `${courseSlug}/${lesson.slug}`
  )
    ? "✅ Completed"
    : "⏳ Pending"}
</p>

           
          </div>
        ))}
      </div>
    </div>
  );
}