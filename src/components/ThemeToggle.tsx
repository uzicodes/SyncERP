"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const isDark = savedTheme === "dark";

    const initialTheme: "dark" | "light" = isDark ? "dark" : "light";
    setTheme(initialTheme);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: "dark" | "light" = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div
        className="w-8 h-8 rounded-md border border-[#93032E]/30 bg-[#1a1a1a] flex items-center justify-center opacity-70"
        aria-hidden="true"
      >
        <Moon className="w-4 h-4 text-gray-400" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="w-8 h-8 flex items-center justify-center rounded-md border text-white bg-[#1a1a1a] border-[#93032E]/30 hover:bg-[#93032E]/20 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#93032E]/40"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-gray-300 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}

