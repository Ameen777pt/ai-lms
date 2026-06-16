"use client";
import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import Link from "next/link";


const courses = [
  {
    slug: "ai-for-beginners",
    title: "AI for Beginners",
    instructor: "Mike",
     description:"good course",
      category: "AI",
  },
  {
    slug: "nextjs-mastery",
    title: "Next.js Mastery",
    instructor: "Sarah",
    description:"next master",
     category: "Next.js",
  },
  {
    slug: "react-fundamentals",
    title: "React Fundamentals",
    instructor: "John",  
    description:
    "Learn the fundamentals of React and build modern web applications.",
     category: "React",
  },
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] =
  useState("");
  const [sortOrder, setSortOrder] =
  useState("asc");
  const [selectedCategory, setSelectedCategory] =
  useState("All");
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
</Link>
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
     <div className="flex gap-2 mb-6">
      
  <input
    type="text"
    placeholder="Search courses..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="border p-3 rounded-lg flex-1"
  />

  <button
    onClick={() => setSearchTerm("")}
    className="border px-4 rounded-lg"
  >
    Clear
  </button>
  
</div>
<div className="mb-6">
  <select
    value={sortOrder}
    onChange={(e) =>
      setSortOrder(e.target.value)
    }
    className="border p-2 rounded-lg"
  >
    <option value="asc">
      A → Z
    </option>

    <option value="desc">
      Z → A
    </option>
  </select>
</div>
<div className="mb-6">
  <select
    value={selectedCategory}
    onChange={(e) =>
      setSelectedCategory(
        e.target.value
      )
    }
    className="border p-2 rounded-lg"
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
  className="border px-4 py-2 rounded-lg"
>
  Reset Filters
</button>
<p className="mb-6 text-gray-600">
  Showing {filteredCourses.length} of{" "}
  {courses.length} courses
</p>


      <div className="grid md:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
  key={course.slug}
  slug={course.slug}
  title={course.title}
  instructor={course.instructor}
  description={course.description}
  
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