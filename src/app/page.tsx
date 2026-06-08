"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";
import CoursesSection from "@/components/CoursesSection";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      

      <HeroSection />

        <div className="flex justify-center my-6">
  <button
    onClick={() => setIsLoggedIn(!isLoggedIn)}
    className="px-6 py-3 bg-green-600 text-white rounded-lg"
  >
    {isLoggedIn ? "Logout" : "Login"}
  </button>
</div> 

{isLoggedIn && (
  <p className="text-center text-xl font-semibold">
    Welcome back, Ameen!
  </p>
)}

{!isLoggedIn && (
  <p className="text-center text-xl font-semibold text-red-500">
    Please log in to continue.
  </p>
)}

      <FeaturesSection />
      <TestimonialsSection />
      <CoursesSection />
      <Footer />
    </>
  );
}