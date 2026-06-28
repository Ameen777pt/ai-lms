"use client";
import { useEffect, useState } from "react";

import CourseCard from "@/components/CourseCard";
import Link from "next/link";

import { courses } from "@/data/courses";
export default function CoursesPage() {
 
  const [searchTerm, setSearchTerm] =
  useState("");
  const [sortOrder, setSortOrder] =
  useState("asc");
  const [selectedCategory, setSelectedCategory] =
  useState("All");
  const [favorites, setFavorites] =
  useState<string[]>([]);
  useEffect(() => {
  const loadFavorites = async () => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) return;

    const response = await fetch(
      `/api/favorites?email=${userEmail}`
    );

    if (!response.ok) return;

    const data = await response.json();

    setFavorites(
      data.map(
        (favorite: { courseSlug: string }) =>
          favorite.courseSlug
      )
    );
  };

  loadFavorites();
}, []);
  const filteredCourses = courses
  .filter(
  (course) =>
    (
      course.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      course.instructor
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    ) &&
    (
      selectedCategory === "All" ||
      course.category ===
        selectedCategory
    )
);
const aiCount = courses.filter(
  (course) => course.category === "AI"
).length;

const reactCount = courses.filter(
  (course) => course.category === "React"
).length;

const nextCount = courses.filter(
  (course) => course.category === "Next.js"
).length;
const popularCourses = courses.slice(
  0,
  2
);
const featuredCourse = courses[0];
const totalCourses = courses.length;

const totalCategories = new Set(
  courses.map(
    (course) => course.category
  )
).size;

const totalInstructors = new Set(
  courses.map(
    (course) => course.instructor
  )
).size;
const toggleFavorite = async (
  slug: string
) => {
  const userEmail =
    localStorage.getItem("userEmail");

  if (!userEmail) {
    return;
  }

  if (favorites.includes(slug)) {
    const response = await fetch(
      "/api/favorites",
      {
        method: "DELETE",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          courseSlug: slug,
        }),
      }
    );

    if (!response.ok) return;

    setFavorites(
      favorites.filter(
        (favoriteSlug) =>
          favoriteSlug !== slug
      )
    );
  } else {
    const response = await fetch(
      "/api/favorites",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          courseSlug: slug,
        }),
      }
    );

    if (!response.ok) return;

    setFavorites([
      ...favorites,
      slug,
    ]);
  }
};
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Courses
      </h1>
      <h2 className="text-2xl font-bold mb-4">
  ⭐ Featured Course
</h2>

<Link
  href={`/courses/${featuredCourse.slug}`}
>
  <div className="border-2 rounded-lg p-6 mb-8 cursor-pointer">
    <h3 className="text-xl font-bold">
      {featuredCourse.title}
    </h3>

    <p className="mt-2">
      Instructor: {featuredCourse.instructor}
    </p>

    <p className="mt-2">
      {featuredCourse.description}
    </p>
  </div>
  </Link>
  <h2 className="text-2xl font-bold mb-4">
  📊 Platform Statistics
</h2>

<div className="grid md:grid-cols-3 gap-4 mb-8">
  <div className="border p-4 rounded-lg">
    <p className="font-semibold">
      Total Courses
    </p>
    <p>{totalCourses}</p>
  </div>

  <div className="border p-4 rounded-lg">
    <p className="font-semibold">
      Categories
    </p>
    <p>{totalCategories}</p>
  </div>

  <div className="border p-4 rounded-lg">
    <p className="font-semibold">
      Instructors
    </p>
    <p>{totalInstructors}</p>
  </div>
</div>

      <h2 className="text-2xl font-bold mb-4">
  🔥 Popular Courses
</h2>

<div className="grid md:grid-cols-2 gap-4 mb-8">
  {popularCourses.map((course) => (
    <div
      key={course.slug}
      className="border p-4 rounded-lg"
    >
      <h3 className="font-semibold">
        {course.title}
      </h3>

      <p>{course.instructor}</p>
    </div>
  ))}
</div>
     <div className="flex gap-2 items-center">
      
  <input
    type="text"
    placeholder="Search courses..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="flex-1 border p-3 rounded"
  />

  <button
    onClick={() => setSearchTerm("")}
    className="px-4 py-3 border rounded"
  >
    Clear
  </button>
  
</div>
<div className="flex flex-col md:flex-row gap-2 mt-4">
  <select
    value={sortOrder}
    onChange={(e) =>
      setSortOrder(e.target.value)
    }
    className="flex-1 border p-3 rounded"
  >
    <option value="asc">
      A → Z
    </option>

    <option value="desc">
      Z → A
    </option>
  </select>

  <select
    value={selectedCategory}
    onChange={(e) =>
      setSelectedCategory(
        e.target.value
      )
    }
    className="flex-1 border p-3 rounded"
  >
    <option value="All">
      All Categories
    </option>

    <option value="AI">
      AI ({aiCount})
    </option>

    <option value="React">
      React ({reactCount})
    </option>

    <option value="Next.js">
      Next.js ({nextCount})
    </option>
  </select>
</div>

<button
  onClick={() => {
    setSearchTerm("");
    setSortOrder("asc");
    setSelectedCategory("All");
  }}
   className="mt-4 px-4 py-3 border rounded"
>
  Reset Filters
</button>
<p className="mb-6 text-gray-600">
  Showing {filteredCourses.length} of{" "}
  {courses.length} courses
</p>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
         <CourseCard
  key={course.slug}
  slug={course.slug}
  title={course.title}
  instructor={course.instructor}
  description={course.description}
  isFavorite={favorites.includes(
    course.slug
  )}
  toggleFavorite={toggleFavorite}
/>

        ))}
      </div>
      {filteredCourses.length === 0 && (
  <div className="mt-6 text-center">
    <p className="text-lg font-semibold">
      No courses found.
    </p>

    <p className="mt-2">
      Try a different search term.
    </p>
  </div>
)}
    </div>
  );
}