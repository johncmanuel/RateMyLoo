import Link from "next/link";

export default function Home() {
	return (
		<>
			<div>Hello world!</div>
			<Link href="/api">
				<code>api/index.py</code>
			</Link>
		</>
	);
}
