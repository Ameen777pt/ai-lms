"use client";

import { courses } from "@/data/courses";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [userEmail, setUserEmail] =
    useState("");

  const [enrolledCourses, setEnrolledCourses] =
    useState<string[]>([]);

  const [completedLessonIds, setCompletedLessonIds] =
    useState<string[]>([]);

  useEffect(() => {
    const email =
      localStorage.getItem("userEmail") || "";

    setUserEmail(email);

    const storedCourses = JSON.parse(
      localStorage.getItem("enrolledCourses") ||
        "[]"
    );

    setEnrolledCourses(storedCourses);

    const storedLessons = JSON.parse(
      localStorage.getItem("completedLessons") ||
        "[]"
    );

    setCompletedLessonIds(storedLessons);
  }, []);

  const completedCourses = courses
    .filter((course) =>
      enrolledCourses.includes(course.slug)
    )
    .filter((course) => {
      const completed = course.lessons.filter(
        (lesson) =>
          completedLessonIds.includes(
            `${course.slug}/${lesson.slug}`
          )
      ).length;

      return (
        completed === course.lessons.length
      );
    }).length;

  const progressPercentage = Math.round(
    (completedLessonIds.length /
      courses.flatMap(
        (course) => course.lessons
      ).length) *
      100
  );

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Profile
      </h1>

      <div className="border rounded-lg p-6 mt-6">
        <p>
          <strong>Email:</strong>{" "}
          {userEmail}
        </p>

        <p className="mt-3">
          <strong>Enrolled Courses:</strong>{" "}
          {enrolledCourses.length}
        </p>

        <p className="mt-3">
          <strong>Completed Courses:</strong>{" "}
          {completedCourses}
        </p>

        <p className="mt-3">
          <strong>Completed Lessons:</strong>{" "}
          {completedLessonIds.length}
        </p>

        <p className="mt-3">
          <strong>Overall Progress:</strong>{" "}
          {progressPercentage}%
        </p>
      </div>
    </div>
  );
}