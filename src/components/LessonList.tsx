"use client";

import { useState } from "react";

type Lesson = {
  slug: string;
  title: string;
  duration: string;
  completed: boolean;
  content: string;
};

export default function LessonList({
  lessons,
}: {
  lessons: Lesson[];
}) {
  const [lessonData, setLessonData] = useState(lessons);

  return (
    <div className="space-y-3">
      {lessonData.map((lesson, index) => (
        <div
          key={lesson.title}
          className="border p-4 rounded-lg"
        >
          <h3 className="font-semibold">
            Lesson {index + 1}: {lesson.title}
          </h3>

          <p>Duration: {lesson.duration}</p>

          <p>
            Status:{" "}
            {lesson.completed
              ? "✅ Completed"
              : "⏳ Pending"}
          </p>
          <button disabled={lesson.completed}
  onClick={() => {
    const updatedLessons = lessonData.map(
      (item, i) =>
        i === index
          ? { ...item, completed: true }
          : item
    );

    setLessonData(updatedLessons);
  }}
  className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
>
 {lesson.completed
  ? "Completed"
  : "Mark Complete"}
</button>
        </div>
      ))}
    </div>
  );
}