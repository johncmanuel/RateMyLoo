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
    color: "teal",
  },
  loginContainer: {
    display: "flex",
    alignItems: "center",
  },
  singedInText: {
    color: "teal",
  },
};

const Header = ({ email, signOut }: any) => (
  <div style={styles.container}>
    <div style={styles.loginContainer}>
      {email ? (
        <>
          <p style={styles.singedInText}>Signed in as {email}</p>
          <div style={styles.singedInText}>
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
          <p style={styles.singedInText}>You are not signed in.</p>
          <div style={styles.singedInText}>
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
