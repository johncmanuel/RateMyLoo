import React, { useState, useEffect } from 'react';

const LightModeToggler = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(storedDarkMode ? storedDarkMode === 'true' : prefersDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      className={`light-mode-toggle-button ${isDarkMode ? 'dark-mode' : ''}`}
      onClick={toggleDarkMode}
    >
      {/* Icon or text for the button */}
    </button>
  );
};

export default LightModeToggler;
