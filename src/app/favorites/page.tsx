"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { courses } from "@/data/courses";
import CourseCard from "@/components/CourseCard";

export default function FavoritesPage() {
    const router = useRouter();
  const [favorites, setFavorites] =
    useState<string[]>([]);
const removeFavorite = async (
  slug: string
) => {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    router.push("/login");
    return;
  }

  const userEmail =
    localStorage.getItem("userEmail");

  if (!userEmail) return;

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
};
useEffect(() => {
  const loadFavorites = async () => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const userEmail =
      localStorage.getItem("userEmail");

    if (!userEmail) return;

    const response = await fetch(
      `/api/favorites?email=${userEmail}`
    );

    if (!response.ok) return;

    const data = await response.json();

    setFavorites(
      data.map(
        (favorite: {
          courseSlug: string;
        }) => favorite.courseSlug
      )
    );
  };

  loadFavorites();
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