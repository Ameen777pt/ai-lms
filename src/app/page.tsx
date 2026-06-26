"use client";


import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";
import CoursesSection from "@/components/CoursesSection";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";



export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      

      <HeroSection />

       <div className="flex justify-center gap-4 my-6">
  {isLoggedIn ? (
    <>
      <Link
        href="/courses"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Courses
      </Link>

      <Link
        href="/dashboard"
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Dashboard
      </Link>
    </>
  ) : (
    <Link
  href="/login"
  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
>
  Login
</Link>
  )}
</div>



      <FeaturesSection />
      <TestimonialsSection />
      <CoursesSection />
      <Footer />
    </>
  );
}