"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Account created! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    border: "1px solid #ddd",
    borderRadius: 4,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff"
  };

  return (
    <div style={{ 
      padding: 40, 
      maxWidth: 400, 
      margin: "50px auto",
      backgroundColor: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{ color: "#000", marginBottom: 20 }}>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input 
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button 
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            backgroundColor: "#10b981",
            color: "white",
            border: "none",
            borderRadius: 4,
            fontSize: 16,
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Create Account
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: 15 }}>{error}</p>}
      {message && <p style={{ color: "green", marginTop: 15 }}>{message}</p>}
      
      <p style={{ marginTop: 20, textAlign: "center", color: "#666" }}>
        Already have an account? <a href="/login" style={{ color: "#0070f3", textDecoration: "none", fontWeight: "600" }}>Login</a>
      </p>
    </div>
  );
}
