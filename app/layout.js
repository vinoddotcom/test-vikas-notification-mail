"use client";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Email Notification App</title>
      </head>
      <body style={styles.body}>
        <SessionProvider>
          <header style={styles.header}>
            <div style={styles.brand}>📧 Email Notification App</div>
          </header>

          <main style={styles.main}>{children}</main>

          <footer style={styles.footer}>
            © {new Date().getFullYear()} Email Notification App
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}

/* ===== UI STYLES ONLY (NO LOGIC) ===== */
const styles = {
  body: {
    margin: 0,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    background: "#f4f6fb",
    color: "#333",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "#667eea",
    color: "#fff",
    padding: "14px 20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
  brand: {
    fontSize: "18px",
    fontWeight: 600,
  },
  main: {
    flex: 1,
    padding: "20px",
  },
  footer: {
    background: "#fff",
    borderTop: "1px solid #eee",
    textAlign: "center",
    padding: "10px",
    fontSize: "13px",
    color: "#777",
  },
};
