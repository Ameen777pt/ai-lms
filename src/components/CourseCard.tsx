import Link from "next/link";
type CourseCardProps = {
  title: string;
  instructor: string;
  description: string;
  slug: string;
  isFavorite: boolean;
  toggleFavorite: (
    slug: string
  ) => void;
};
export default function CourseCard({
  title,
  instructor,
  slug,
  isFavorite,
  toggleFavorite,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${slug}`}>
      <div className="border p-6 rounded-lg shadow-sm hover:shadow-md">
       <div className="flex justify-between items-center mb-2">
  <h3 className="text-xl font-bold">
    {title}
  </h3>

  <button
    onClick={(e) => {
      e.preventDefault();
      toggleFavorite(slug);
    }}
  >
    {isFavorite ? "★" : "☆"}
  </button>
</div>

        <p>
          Instructor: {instructor}
        </p>
      </div>
    </Link>
  );
}