import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed.");
      } else {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 1800); // redirec after a short success message
      }
    } catch (err) {
      setError("Network error. Try again!");
    }
    setLoading(false);
  }

  return (
    <div className="auth-page">
      <h2>Sign-Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Create Account"}</button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">Signup successful! Redirecting...</div>}
      </form>
    </div>
  );
}
