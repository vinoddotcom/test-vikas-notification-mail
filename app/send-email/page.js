"use client";
import { useState } from "react";

export default function SendEmail() {
  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false); // ✅ NEW

  // ❗ LOGIC SAME – ONLY UI STATE ADDED
  const sendEmail = async () => {
    if (loading) return;

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails, subject, message }),
      });

      const data = await res.json();
      setStatus(data.message);
    } catch (err) {
      setStatus("❌ Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>📧 Send Email</h2>

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
        {status && <p style={styles.status}>{status}</p>}

        {/* Loading text */}
        {loading && <p style={styles.loading}>⏳ Please wait...</p>}
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
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: "100px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "none",
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
    marginTop: "10px",
    textAlign: "center",
    fontSize: "13px",
    color: "#555",
  },
};
