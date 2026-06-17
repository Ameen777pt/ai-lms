"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { courses } from "@/data/courses";
import CourseCard from "@/components/CourseCard";

export default function FavoritesPage() {
    const router = useRouter();
  const [favorites, setFavorites] =
    useState<string[]>([]);
    const removeFavorite = (
  slug: string
) => {
  const isLoggedIn =
  localStorage.getItem(
    "isLoggedIn"
  );

if (!isLoggedIn) {
  router.push("/login");
  return;
}

const userEmail =
  localStorage.getItem(
    "userEmail"
  );

  const updatedFavorites =
    favorites.filter(
      (favoriteSlug) =>
        favoriteSlug !== slug
    );

  setFavorites(updatedFavorites);

  localStorage.setItem(
    `favorites_${userEmail}`,
    JSON.stringify(updatedFavorites)
  );
};

 useEffect(() => {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    router.push("/login");
    return;
  }

  const userEmail =
    localStorage.getItem("userEmail");

  if (!userEmail) return;

  const savedFavorites =
    localStorage.getItem(
      `favorites_${userEmail}`
    );

  if (savedFavorites) {
    setFavorites(
      JSON.parse(savedFavorites)
    );
  }
}, [router]);
  const favoriteCourses =
  courses.filter((course) =>
    favorites.includes(course.slug)
  );

  return (
    <div className="p-10">
  <h1 className="text-4xl font-bold mb-8">
    My Favorites
  </h1>

  {favoriteCourses.length === 0 ? (
  <p>
    You have no favorite courses yet.
  </p>
) : (
  <div className="grid md:grid-cols-3 gap-6">
    {favoriteCourses.map((course) => (
      <CourseCard
        key={course.slug}
        slug={course.slug}
        title={course.title}
        instructor={course.instructor}
        description={course.description}
        isFavorite={true}
        toggleFavorite={removeFavorite}
      />
    ))}
  </div>
)}
</div>
  );
}