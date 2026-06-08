"use client";

import { useState } from "react";
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
}: {
  lessons: Lesson[];
  courseSlug: string;
}) {
  const [lessonData, setLessonData] = useState(lessons);

  const completedLessons = lessonData.filter(
    (lesson) => lesson.completed
  ).length;

  const progress = Math.round(
    (completedLessons / lessonData.length) * 100
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
        <p className="text-green-600 font-bold mt-4">
          🏆 Course Completed!
        </p>
      )}

      <div className="space-y-3 mt-6">
        {lessonData.map((lesson, index) => (
          <div
            key={lesson.title}
            className="border p-4 rounded-lg"
          >
           <Link href={`/courses/${courseSlug}/${lesson.slug}`}>
  <h3 className="font-semibold text-red-500">
  Lesson {index + 1}: {lesson.title}
</h3>
</Link>

            <p>Duration: {lesson.duration}</p>

            <p
              className={
                lesson.completed
                  ? "text-green-600"
                  : "text-orange-500"
              }
            >
              Status:{" "}
              {lesson.completed
                ? "✅ Completed"
                : "⏳ Pending"}
            </p>

            <button
              onClick={() => {
  const updatedLessons = lessonData.map(
    (item, i) =>
      i === index
        ? {
            ...item,
            completed: !item.completed,
          }
        : item
  );

  setLessonData(updatedLessons);
}}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
              {lesson.completed
  ? "Mark Pending"
  : "Mark Complete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}