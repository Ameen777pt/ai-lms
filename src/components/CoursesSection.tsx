const courses = [
  {
    title: "React Fundamentals",
    instructor: "John",
  },
  {
    title: "Next.js Mastery",
    instructor: "Sarah",
  },
  {
    title: "AI for Beginners",
    instructor: "Mike",
  },
];

export default function CoursesSection() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-10">
        Popular Courses
      </h2>

      <div className="grid md:grid-cols-3 gap-6 px-10">
        {courses.map((course) => (
          <div
            key={course.title}
            className="border p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-xl font-bold mb-2">
              {course.title}
            </h3>

            <p>
              Instructor: {course.instructor}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}