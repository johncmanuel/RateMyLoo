import React from "react";
import Link from "next/link";

const styles = {
	content: {
		padding: "4px 32px 32px 32px",
		background: "#eeeeee",
		display: "inline-block",
		// position: "absolute",
		border: "4	px solid teal",
		borderRadius: "8px",
		bottom: "0",
		left: "0",
		// right: "0",
		marginTop: "20px", // Adjust the margin top as needed
	},
	linkContainer: {
		color: "teal",
		display: "block",
		lineHeight: "160%",
		marginBottom: "10px", // Adjust the margin bottom as needed
	},
};

// TODO: Embed all links inside Footer and Header components
const Links = () => (
	<div style={styles.content}>
		<div style={styles.linkContainer}>
			<Link href="/">Home</Link>
		</div>
		<div style={styles.linkContainer}>
			<Link href="/loo">Loo Page</Link>
		</div>
		<div style={styles.linkContainer}>
			<Link href="/user">User Page</Link>
		</div>
		<div style={styles.linkContainer}>
			<Link href="/auth">Login page</Link>
		</div>
	</div>
);

export default Links;
