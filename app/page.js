import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // ❌ Not logged in
  if (!session) {
    return (
      <div style={styles.center}>
        <div style={styles.card}>
          <h2 style={styles.title}>🔐 Login Required</h2>
          <p style={styles.text}>
            Please sign in using your social account to continue.
          </p>

          <Link href="/api/auth/signin" style={styles.primaryBtn}>
            Continue with Social Login
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Logged in
  return (
    <div style={styles.center}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          👋 Welcome {session.user?.name}
        </h2>

        <p style={styles.text}>
          You are successfully logged in.
        </p>

        <Link href="/send-email" style={styles.secondaryBtn}>
          📧 Go to Email Sender
        </Link>

        <Link href="/api/auth/signout" style={styles.logout}>
          Logout
        </Link>
      </div>
    </div>
  );
}

/* ===== UI STYLES ONLY ===== */
const styles = {
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "28px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "22px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  primaryBtn: {
    display: "block",
    padding: "12px",
    borderRadius: "8px",
    background: "#4267B2",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 500,
  },
  secondaryBtn: {
    display: "block",
    padding: "12px",
    borderRadius: "8px",
    background: "#667eea",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 500,
    marginBottom: "12px",
  },
  logout: {
    fontSize: "14px",
    color: "#e53e3e",
    textDecoration: "none",
  },
};
