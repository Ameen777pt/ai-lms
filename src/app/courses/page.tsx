import CourseCard from "@/components/CourseCard";

const courses = [
  {
    slug: "ai-for-beginners",
    title: "AI for Beginners",
    instructor: "Mike",
     description:"good course",
  },
  {
    slug: "nextjs-mastery",
    title: "Next.js Mastery",
    instructor: "Sarah",
    description:"next master",
  },
  {
    slug: "react-fundamentals",
    title: "React Fundamentals",
    instructor: "John",  
    description:
    "Learn the fundamentals of React and build modern web applications.",
  },
];

export default function CoursesPage() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Courses
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
  key={course.slug}
  slug={course.slug}
  title={course.title}
  instructor={course.instructor}
  description={course.description}
/>
        ))}
      </div>
    </div>
  );
}