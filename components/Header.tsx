import React from "react";
import Link from "next/link";

const styles = {
	container: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "flex-start",
		padding: 16,
	},
	versionsContainer: {
		marginLeft: 0,
		marginRight: "auto",
	},
	button: {
		marginLeft: 16,
		cursor: "pointer",
	},
	nfaVersion: {
		fontWeight: "600",
	},
	loginContainer: {
		display: "flex",
		alignItems: "center",
	},
};

const Header = ({ email, signOut }: any) => (
	<div style={styles.container}>
		<div style={styles.loginContainer}>
			{email ? (
				<>
					<p>Signed in as {email}</p>
					<div>
						<button
							type="button"
							onClick={() => {
								signOut();
							}}
							style={styles.button}
						>
							Sign out
						</button>
					</div>
				</>
			) : (
				<>
					<p>You are not signed in.</p>
					<div>
						<Link href="/auth">
							<button type="button" style={styles.button}>
								Sign in
							</button>
						</Link>
					</div>
				</>
			)}
		</div>
	</div>
);

export default Header;
