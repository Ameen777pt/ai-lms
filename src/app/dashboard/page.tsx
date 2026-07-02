"use client";
import { courses } from "@/data/courses";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import MyCourses from "@/components/dashboard/MyCourses";
import RecommendedCourses from "@/components/dashboard/RecommendedCourses";
import NotificationList from "@/components/dashboard/NotificationList";
import AchievementList from "@/components/dashboard/AchievementList";
import RecentlyViewedList from "@/components/dashboard/RecentlyViewedList";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";


export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const {
  userEmail,
  loading: authLoading,
} = useAuth();
 
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

    if (!email) {
  return;
}

    try {
      const [
        enrollmentResponse,
        lessonResponse,
        recentlyViewedResponse,
        notificationsResponse,
      ] = await Promise.all([
        fetch(
          `/api/enrollments?email=${encodeURIComponent(email)}`,
          {
            cache: "no-store",
          }
        ),

        fetch(
          `/api/lesson-progress?email=${encodeURIComponent(email)}`,
          {
            cache: "no-store",
          }
        ),

        fetch(
          `/api/recently-viewed?email=${encodeURIComponent(email)}`,
          {
            cache: "no-store",
          }
        ),

        fetch(
          `/api/notifications?email=${encodeURIComponent(email)}`,
          {
            cache: "no-store",
          }
        ),
      ]);
      if (
  !enrollmentResponse.ok ||
  !lessonResponse.ok ||
  !recentlyViewedResponse.ok ||
  !notificationsResponse.ok
) {
  throw new Error("Failed to load dashboard");
}

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
    }  catch {
    setError(
      "Failed to load dashboard. Please try again."
    );
} finally {
    setLoading(false);
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
   if (authLoading || loading) {
  return (
    <ProtectedRoute>
      <Loading message="Loading dashboard..." />
    </ProtectedRoute>
  );
}
if (error) {
  return (
    <ProtectedRoute>
      <ErrorMessage message={error} />
    </ProtectedRoute>
  );
}

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
<DashboardStats
  enrolledCourses={enrolledCourses.length}
  completedCourses={completedCourses}
  completedLessons={completedLessons}
  pendingLessons={pendingLessons}
  progressPercentage={progressPercentage}
/>
<ContinueLearning
  continueCourse={continueCourse}
  nextLesson={nextLesson}
/>
<MyCourses
  enrolledCourses={enrolledCourses}
  completedLessonIds={completedLessonIds}
/>
<RecommendedCourses
  enrolledCourses={enrolledCourses}
/>
<NotificationList
  notifications={notifications}
/>
<AchievementList
  achievements={achievements}
/>
<RecentlyViewedList
  recentlyViewed={recentlyViewed}
/>
      
    </div>
    </ProtectedRoute>
  );

}