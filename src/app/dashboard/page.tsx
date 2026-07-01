"use client";
import { courses } from "@/data/courses";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
const { userEmail } = useAuth();
 
  const [completedLessonIds, setCompletedLessonIds] =
  useState<string[]>([]);
  const [enrolledCourses, setEnrolledCourses] =
  useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] =
  useState<string[]>([]);
  const [notifications, setNotifications] =
  useState<string[]>([]);
  
  useEffect(() => {
  async function loadDashboardData() {
    const email = userEmail;

if (!email) return;

    const enrollmentResponse = await fetch(
  `/api/enrollments?email=${encodeURIComponent(email)}`,
  {
    cache: "no-store",
  }
);

    if (enrollmentResponse.ok) {
      const enrollments =
        await enrollmentResponse.json();

      setEnrolledCourses(
        enrollments.map(
          (enrollment: {
            courseSlug: string;
          }) => enrollment.courseSlug
        )
      );
    }

    const lessonResponse = await fetch(
  `/api/lesson-progress?email=${encodeURIComponent(email)}`,
  {
    cache: "no-store",
  }
);

    if (lessonResponse.ok) {
      const progress =
        await lessonResponse.json();

      setCompletedLessonIds(
        progress.map(
          (lesson: {
            courseSlug: string;
            lessonSlug: string;
          }) =>
            `${lesson.courseSlug}/${lesson.lessonSlug}`
        )
      );
    }

   const recentlyViewedResponse = await fetch(
  `/api/recently-viewed?email=${encodeURIComponent(email)}`,
  {
    cache: "no-store",
  }
);

if (recentlyViewedResponse.ok) {
  const recentlyViewedData =
    await recentlyViewedResponse.json();

  setRecentlyViewed(
    recentlyViewedData.map(
      (course: { courseSlug: string }) =>
        course.courseSlug
    )
  );
}

  const notificationsResponse = await fetch(
  `/api/notifications?email=${encodeURIComponent(email)}`,
  {
    cache: "no-store",
  }
);

if (notificationsResponse.ok) {
  const notificationsData =
    await notificationsResponse.json();

  setNotifications(
    notificationsData.map(
      (notification: { message: string }) =>
        notification.message
    )
  );
}
  }

  loadDashboardData();
}, [userEmail]);
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
  const achievements = [];

if (enrolledCourses.length >= 1) {
  achievements.push(
    "🏅 First Enrollment"
  );
}

if (
  completedLessonIds.length >= 1
) {
  achievements.push(
    "🏅 First Lesson Completed"
  );
}

if (completedCourses >= 1) {
  achievements.push(
    "🏅 Course Finisher"
  );
}
const recommendedCourses =
  courses
    .filter(
      (course) =>
        !enrolledCourses.includes(
          course.slug
        )
    )
    .slice(0, 2);

  return (
    <ProtectedRoute>
    <div className="p-10">
      <h1 className="text-3xl md:text-5xl font-bold text-red-500">
  Dashboard
</h1>
<p className="text-lg md:text-2xl break-words">
  Welcome {userEmail}
</p>
<Link
  href="/profile"
  className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded"
>
  View Profile
</Link>
<div className="grid grid-cols-2 gap-4 mt-6">
  <div className="border rounded-lg p-6 text-center">
    <p className="text-gray-400 text-sm">📚 Enrolled</p>
    <p className="text-4xl font-bold mt-2">
      {enrolledCourses.length}
    </p>
  </div>

  <div className="border rounded-lg p-6 text-center">
    <p className="text-gray-400 text-sm">✅ Completed</p>
    <p className="text-4xl font-bold mt-2">
      {completedCourses}
    </p>
  </div>

  <div className="border rounded-lg p-6 text-center">
    <p className="text-gray-400 text-sm">🎯 Lessons</p>
    <p className="text-4xl font-bold mt-2">
      {completedLessons}
    </p>
  </div>

  <div className="border rounded-lg p-6 text-center">
    <p className="text-gray-400 text-sm">🔥Active</p>
    <p className="text-4xl font-bold mt-2">
      {enrolledCourses.length -
        completedCourses}
    </p>
  </div>

  <div className="border rounded-lg p-6 text-center">
    <p className="text-gray-400 text-sm">⏳ Pending</p>
    <p className="text-4xl font-bold mt-2">
      {pendingLessons}
    </p>
  </div>

  <div className="border rounded-lg p-6 text-center">
    <p className="text-gray-400 text-sm">📈 Progress</p>
    <p className="text-4xl font-bold mt-2">
      {progressPercentage}%
    </p>
  </div>
</div>
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
<h2 className="text-2xl font-bold mt-8">
  Recommended For You
</h2>

{recommendedCourses.length === 0 && (
  <p className="mt-2">
    You've enrolled in all courses.
  </p>
)}

{recommendedCourses.map((course) => (
  <Link
    key={course.slug}
    href={`/courses/${course.slug}`}
  >
    <div className="border rounded-lg p-4 mt-4">
      <h3 className="font-semibold">
        {course.title}
      </h3>

      <p className="mt-2">
        Instructor: {course.instructor}
      </p>
    </div>
  </Link>
))}
<h2 className="text-2xl font-bold mt-8">
  Notifications
</h2>

{notifications.length === 0 && (
  <p className="mt-2">
    No notifications yet.
  </p>
)}

{[...new Set(notifications)].map(
  (notification, index) => (
    <div
  key={index}
  className="bg-amber-100 text-black border border-amber-300 rounded-lg p-4 mt-4"
>
      🔔 {notification}
    </div>
  )
)}
<h2 className="text-2xl font-bold mt-8">
  Achievements
</h2>

{achievements.length === 0 && (
  <p className="mt-2">
    No achievements unlocked yet.
  </p>
)}

<div className="grid md:grid-cols-2 gap-4 mt-4">
  {achievements.map(
    (achievement) => (
      <div
        key={achievement}
        className="border rounded-lg p-4"
      >
        {achievement}
      </div>
    )
  )}
</div>
<h2 className="text-2xl font-bold mt-8">
  Recently Viewed
</h2>

{recentlyViewed.length === 0 && (
  <p className="mt-2">
    No recently viewed courses.
  </p>
)}

{recentlyViewed.map((slug) => {
  const course = courses.find(
    (course) => course.slug === slug
  );

  if (!course) return null;

  return (
    <Link
  href={`/courses/${course.slug}`}
  key={slug}
>
  <div className="border rounded-lg p-4 mt-4">
    <h3 className="font-semibold">
      {course.title}
    </h3>

    <p className="mt-2">
      Instructor: {course.instructor}
    </p>
  </div>
</Link>
  );
})}
      
    </div>
    </ProtectedRoute>
  );

}