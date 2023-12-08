import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setIsDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleDarkMode}
      className={`bg-gray-300 dark:bg-gray-800 rounded-full w-12 h-6 flex items-center p-1 focus:outline-none ${
        isDarkMode ? "dark:text-white" : "text-black"
      }`}
    >
      {isDarkMode ? (
        <FiMoon className="text-yellow-500 dark:text-yellow-300" />
      ) : (
        <FiSun className="text-gray-800 dark:text-white" />
      )}
      <div
        className={`w-5 h-5 rounded-full bg-white dark:bg-gray-700 shadow-md transform transition-transform ${
          isDarkMode ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default DarkModeToggle;
