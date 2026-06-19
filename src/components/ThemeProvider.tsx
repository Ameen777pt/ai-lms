"use client";

import { useEffect } from "react";

export default function ThemeProvider() {
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "light") {
      document.documentElement.classList.remove(
        "dark"
      );
    } else {
      document.documentElement.classList.add(
        "dark"
      );
    }
  }, []);

  return null;
}