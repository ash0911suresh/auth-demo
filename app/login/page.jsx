"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
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
      <h1 style={{ color: "#000", marginBottom: 20 }}>Login</h1>
      <form onSubmit={handleLogin}>
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
          placeholder="Password"
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
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 4,
            fontSize: 16,
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Sign In
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: 15 }}>{error}</p>}
      
      <p style={{ marginTop: 20, textAlign: "center", color: "#666" }}>
        Don't have an account? <a href="/signup" style={{ color: "#0070f3", textDecoration: "none", fontWeight: "600" }}>Sign Up</a>
      </p>
    </div>
  );
}