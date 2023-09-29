import "@/styles/globals.css";
import type { AppProps } from "next/app";
import initAuth from "../utils/initAuth";

initAuth();

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
