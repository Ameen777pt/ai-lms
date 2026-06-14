"use client";
import { courses } from "@/data/courses";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] =
  useState("");
  const [completedLessonIds, setCompletedLessonIds] =
  useState<string[]>([]);
  const [enrolledCourses, setEnrolledCourses] =
  useState<string[]>([]);
  const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");

  router.push("/login");
};
  useEffect(() => {
    
  const email =
    localStorage.getItem("userEmail");

  if (email) {
    setUserEmail(email);
  }

  const storedLessons = JSON.parse(
    localStorage.getItem("completedLessons") ||
      "[]"
  );

  setCompletedLessonIds(storedLessons);
const storedCourses = JSON.parse(
  localStorage.getItem("enrolledCourses") ||
    "[]"
);

setEnrolledCourses(storedCourses);

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    router.push("/login");
  }
}, [router]);
const completedLessons =
  completedLessonIds.length;

const totalLessons = courses.flatMap(
  (course) => course.lessons
).length;

const pendingLessons =
  totalLessons - completedLessons;

const progressPercentage = Math.round(
  (completedLessons / totalLessons) * 100
);
const continueCourse = courses
  .filter((course) =>
    enrolledCourses.includes(course.slug)
  )
  .find(
    (course) =>
      course.lessons.some(
        (lesson) =>
          !completedLessonIds.includes(
            `${course.slug}/${lesson.slug}`
          )
      )
  );
const nextLesson =
  continueCourse?.lessons.find(
    (lesson) =>
      !completedLessonIds.includes(
        `${continueCourse.slug}/${lesson.slug}`
      )
  );
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

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-red-500">
  Dashboard
</h1>
<p className="mt-4 text-xl">
  Welcome {userEmail}
</p>
<Link
  href="/profile"
  className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded"
>
  View Profile
</Link>
<p className="mt-2">
  Enrolled Courses: {
    enrolledCourses.length
  }
</p>
<p className="mt-2">
  Completed Courses: {completedCourses}
</p>
<p className="mt-2">
  Completed Lessons: {completedLessons}
</p>
<p className="mt-2">
Active Courses: {
  enrolledCourses.length -
  completedCourses
}
</p>

<p className="mt-2">
  Pending Lessons: {pendingLessons}
</p>
<p className="mt-2">
  Progress: {progressPercentage}%
</p>
<div className="w-full bg-gray-300 rounded-full h-4 mt-3">
  <div
    className="bg-green-500 h-4 rounded-full"
    style={{
      width: `${progressPercentage}%`,
    }}
  ></div>
</div>
<h2 className="text-2xl font-bold mt-8">
  Continue Learning
</h2>
{continueCourse && nextLesson && (
  <Link
    href={`/courses/${continueCourse.slug}/${nextLesson.slug}`}
  >
    <div className="border rounded-lg p-4 mt-4">
    <h3 className="font-semibold">
      {continueCourse.title}
    </h3>

    <p className="mt-2">
  Next Lesson: {nextLesson?.title}
</p>
      </div>
  </Link>
)}
<h2 className="text-2xl font-bold mt-8">
  Your Courses
</h2>
{enrolledCourses.length === 0 && (
  <div className="border rounded-lg p-6 mt-4">
    <p className="font-semibold">
      No enrolled courses yet.
    </p>

    <p className="mt-2">
      Enroll in a course to begin learning.
    </p>
  </div>
)}

{courses
  .filter((course) =>
    enrolledCourses.includes(course.slug)
  )
  .map((course) => {
  const completed = course.lessons.filter(
  (lesson) =>
    completedLessonIds.includes(
      `${course.slug}/${lesson.slug}`
    )
).length;

const total = course.lessons.length;

const progress = Math.round(
  (completed / total) * 100
);
  

  return (
  <Link
  href={`/courses/${course.slug}`}
  key={course.slug}
>
  <div className="border rounded-lg p-4 mb-4">
    <h3 className="font-semibold text-lg">
      {course.title}
    </h3>

    <p className="mt-2">
      Progress: {progress}%
    </p>
    <div className="w-full bg-gray-400 h-4 rounded-full mt-2 overflow-hidden">
  <div
    className="bg-blue-500 h-full"
    style={{
      width: `${progress}%`,
    }}
  />
</div>
    <p>
  Completed Lessons: {completed}/{total}
</p>

    </div>
</Link>
);
})}
      <button
  onClick={handleLogout}
  className="mt-8 bg-red-600 text-white px-6 py-3 rounded-lg"
>
  Logout
</button>
    </div>
  );
}