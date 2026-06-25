"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] =
    useState("dark");

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      "dark";

    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme =
      theme === "dark"
        ? "light"
        : "dark";

    setTheme(newTheme);

    localStorage.setItem(
      "theme",
      newTheme
    );

    if (newTheme === "dark") {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="border px-4 py-2 rounded-lg"
    >
      {theme === "dark"
        ? "☀️"
        : "🌙"}
    </button>
  );
}