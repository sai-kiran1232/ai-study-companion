import { useState } from "react";

export default function App() {
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [hours, setHours] = useState(2);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePlan = async () => {
    if (!subject.trim()) {
      setError("Subject is required");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("http://127.0.0.1:8000/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          level,
          hours_per_day: Number(hours),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error();

      setResult(data.study_plan);
    } catch {
      setError("Failed to generate study plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.title}>AI Study Companion</h1>
          <p style={styles.subtitle}>
            Generate structured, personalized study plans using a Pydantic-based AI agent
          </p>
        </header>

        {/* Form */}
        <section style={styles.card}>
          <div style={styles.field}>
            <label style={styles.label}>Subject</label>
            <input
              style={styles.input}
              placeholder="DBMS, OS, DSA, ML"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Level</label>
              <select
                style={styles.input}
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Hours / Day</label>
              <input
                type="number"
                min="1"
                style={styles.input}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={generatePlan}
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Generating…" : "Generate Study Plan"}
          </button>

          {error && <p style={styles.error}>{error}</p>}
        </section>

        {/* Result */}
        {result && (
          <section style={styles.result}>
            <h2 style={styles.resultTitle}>Generated Study Plan</h2>
            <pre style={styles.resultText}>{result}</pre>
          </section>
        )}

        {/* Footer */}
        <footer style={styles.footer}>
          Built with React, FastAPI, and Pydantic AI
        </footer>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "48px 20px",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  container: {
    maxWidth: "860px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "32px",
  },
  title: {
    fontSize: "36px",
    fontWeight: 700,
    color: "#0f172a",
  },
  subtitle: {
    marginTop: "8px",
    fontSize: "16px",
    color: "#475569",
    maxWidth: "640px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 600,
    marginBottom: "6px",
    color: "#1e293b",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  button: {
    marginTop: "12px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
  },
  error: {
    marginTop: "12px",
    color: "#dc2626",
    fontSize: "14px",
  },
  result: {
    marginTop: "32px",
    background: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  },
  resultTitle: {
    fontSize: "20px",
    fontWeight: 700,
    marginBottom: "12px",
    color: "#0f172a",
  },
  resultText: {
    whiteSpace: "pre-wrap",
    lineHeight: 1.6,
    fontSize: "14.5px",
    color: "#1e293b",
  },
  footer: {
    marginTop: "48px",
    fontSize: "13px",
    color: "#64748b",
    textAlign: "center",
  },
};
