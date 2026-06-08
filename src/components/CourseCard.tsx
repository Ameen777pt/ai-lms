import Link from "next/link";
type CourseCardProps = {
  title: string;
  instructor: string;
  description:string;
  slug: string;
};

export default function CourseCard({
  title,
  instructor,
  slug,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${slug}`}>
      <div className="border p-6 rounded-lg shadow-sm hover:shadow-md">
        <h3 className="text-xl font-bold mb-2">
          {title}
        </h3>

        <p>
          Instructor: {instructor}
        </p>
      </div>
    </Link>
  );
}