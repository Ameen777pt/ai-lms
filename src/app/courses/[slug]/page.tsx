import LessonList from "@/components/LessonList";
import CourseContent from "@/components/CourseContent";
import { courses } from "@/data/courses";



export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = courses.find(
    (course) => course.slug === slug
  );
  if (!course) {
  return <h1>Course not found</h1>;
}

  



  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">
        {course.title}
      </h1>

      <p>
        Instructor: {course.instructor}
      </p>
      


      <p>{course.description}</p>
      <CourseContent
  lessons={course.lessons}
  courseSlug={course.slug}
/>
      <h2 className="text-2xl font-bold mt-8 mb-4">
  Lessons
</h2>


    </div>
  );
}