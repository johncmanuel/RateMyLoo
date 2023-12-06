import { useEffect } from 'react';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import initAuth from "../utils/initAuth";

initAuth();

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Check if dark mode preference is stored in local storage
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      document.documentElement.classList.toggle('dark', JSON.parse(storedDarkMode));
    }
  }, []);

  return (
    <Component {...pageProps} />
  );
}

export default App;
