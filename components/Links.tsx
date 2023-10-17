import React from "react";
import Link from "next/link";

const styles = {
	content: {
		padding: "4px 32px 32px 32px",
		background: "#eeeeee",
		display: "inline-block",
		// position: "absolute",
		bottom: "0",
		left: "0",
		// right: "0",
	},
	linkAnchor: {
		color: "teal",
		display: "block",
		lineHeight: "160%",
	},
};

const Links = () => (
	<div style={styles.content}>
		<div>
			<Link href="/" style={styles.linkAnchor}>
				Home
			</Link>
			<Link href="/loo" style={styles.linkAnchor}>
				Loo Page
			</Link>
			<Link href="/user" style={styles.linkAnchor}>
				User Page
			</Link>
			<Link href="/auth" style={styles.linkAnchor}>
				Login page
			</Link>
		</div>
	</div>
);

export default Links;
