import Link from "next/link";

type Lesson = {
  slug: string;
  title: string;
};

type Course = {
  slug: string;
  title: string;
};

type ContinueLearningProps = {
  continueCourse?: Course;
  nextLesson?: Lesson;
};

export default function ContinueLearning({
  continueCourse,
  nextLesson,
}: ContinueLearningProps) {
  return (
    <>
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
              Next Lesson: {nextLesson.title}
            </p>
          </div>
        </Link>
      )}
    </>
  );
}