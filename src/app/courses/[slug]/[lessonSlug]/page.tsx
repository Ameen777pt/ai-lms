import { courses } from "@/data/courses";
import Link from "next/link";
export default async function LessonPage({
  params,
}: {
  params: Promise<{
    slug: string;
    lessonSlug: string;
  }>;
}) {
  const { slug, lessonSlug } = await params;

  const course = courses.find(
  (course) => course.slug === slug
);

if (!course) {
  return <h1>Course not found</h1>;
}
const lesson = course.lessons.find(
  (lesson) => lesson.slug === lessonSlug
);

if (!lesson) {
  return <h1>Lesson not found</h1>;
}
const lessonIndex = course.lessons.findIndex(
  (lesson) => lesson.slug === lessonSlug
);

const previousLesson =
  lessonIndex > 0
    ? course.lessons[lessonIndex - 1]
    : null;

const nextLesson =
  lessonIndex < course.lessons.length - 1
    ? course.lessons[lessonIndex + 1]
    : null;

  return (
  <div className="p-10">
    <h1 className="text-4xl font-bold">
      {lesson.title}
    </h1>

    <p className="mt-4">
      Duration: {lesson.duration}
    </p>
    

    <p className="mt-2">
      Status:{" "}
      {lesson.completed
        ? "✅ Completed"
        : "⏳ Pending"}
    </p>
    <h2 className="text-2xl font-bold mt-8 mb-4">
  Lesson Content
</h2>

<p className="leading-8 whitespace-pre-line">
  {lesson.content}
</p>
<div className="flex justify-between mt-10">
  {previousLesson ? (
    <Link
      href={`/courses/${slug}/${previousLesson.slug}`}
      className="px-4 py-2 border rounded"
    >
      ← Previous Lesson
    </Link>
  ) : (
    <div></div>
  )}

  {nextLesson ? (
    <Link
      href={`/courses/${slug}/${nextLesson.slug}`}
      className="px-4 py-2 border rounded"
    >
      Next Lesson →
    </Link>
  ) : (
    <div></div>
  )}
</div>
  </div>
);
}