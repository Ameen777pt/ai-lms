"use client";

import { courses } from "@/data/courses";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [userEmail, setUserEmail] =
    useState("");

    const [userName, setUserName] =
  useState("");

  const [enrolledCourses, setEnrolledCourses] =
    useState<string[]>([]);

  const [completedLessonIds, setCompletedLessonIds] =
    useState<string[]>([]);

  useEffect(() => {
    const isLoggedIn =
  localStorage.getItem("isLoggedIn");

if (!isLoggedIn) {
  router.push("/login");
  return;
}
    const email =
      localStorage.getItem("userEmail") || "";

    setUserEmail(email);

    const savedName =
  localStorage.getItem("userName") ||
  "";

setUserName(savedName);

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
  }, [router]);

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

    const saveProfile = () => {
  localStorage.setItem(
    "userName",
    userName
  );

  alert("Profile saved");
};

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
      <p className="mt-2 text-lg text-gray-600">
  Welcome, {userName || "Student"}
</p>

      <div className="border rounded-lg p-6 mt-6">
        <div className="mb-4">
  <label className="block font-semibold mb-2">
    Name
  </label>

  <input
    type="text"
    value={userName}
    onChange={(e) =>
      setUserName(e.target.value)
    }
    className="border p-2 rounded w-full"
    placeholder="Enter your name"
  />
</div>
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
        <button
  onClick={saveProfile}
  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
>
  Save Profile
</button>
      </div>
    </div>
  );
}