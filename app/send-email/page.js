"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SendEmail() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <p style={styles.loading}>⏳ Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!session) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <p style={styles.loading}>🔒 Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const sendEmail = async () => {
    if (loading) return;

    setLoading(true);
    setStatusMessage("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails, subject, message }),
      });

      const data = await res.json();

      if (res.status === 401) {
        router.push("/api/auth/signin");
        return;
      }

      setStatusMessage(data.message);
    } catch (err) {
      setStatusMessage("❌ Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>📧 Send Email</h2>

        <p style={styles.userInfo}>
          👤 Logged in as: <strong>{session.user?.name || session.user?.email}</strong>
        </p>

        <input
          style={styles.input}
          placeholder="Emails (comma separated)"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          disabled={loading}
        />

        <input
          style={styles.input}
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={loading}
        />

        <textarea
          style={styles.textarea}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />

        <button
          style={{
            ...styles.button,
            background: loading ? "#999" : "#667eea",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onClick={sendEmail}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>

        {/* Status Message */}
        {statusMessage && <p style={styles.status}>{statusMessage}</p>}

        {/* Loading text */}
        {loading && <p style={styles.loadingText}>⏳ Please wait...</p>}
      </div>
    </div>
  );
}

/* ===== UI STYLES ONLY ===== */
const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "25px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
  },
  userInfo: {
    textAlign: "center",
    fontSize: "13px",
    color: "#666",
    marginBottom: "20px",
    padding: "8px",
    background: "#f5f5f5",
    borderRadius: "6px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: "100px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
  },
  status: {
    marginTop: "15px",
    textAlign: "center",
    color: "green",
    fontWeight: 500,
  },
  loading: {
    textAlign: "center",
    fontSize: "16px",
    color: "#667eea",
  },
  loadingText: {
    marginTop: "10px",
    textAlign: "center",
    fontSize: "13px",
    color: "#555",
  },
};
