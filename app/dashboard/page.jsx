"use client";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div style={{ 
        padding: 40, 
        textAlign: "center",
        color: "#fff"
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: 40, 
      maxWidth: 600, 
      margin: "50px auto",
      backgroundColor: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{ color: "#000", marginBottom: 20 }}>Dashboard</h1>
      {user ? (
        <>
          <div style={{ 
            padding: 20, 
            backgroundColor: "#f0f9ff", 
            borderRadius: 6,
            marginBottom: 20 
          }}>
            <p style={{ color: "#000", margin: 0 }}>
              <strong>Welcome!</strong>
            </p>
            <p style={{ color: "#666", margin: "10px 0 0 0" }}>
              Email: {user.email}
            </p>
          </div>
          <button 
            onClick={logout}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: 4,
              fontSize: 16,
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Log Out
          </button>
        </>
      ) : (
        <p style={{ color: "#000" }}>Loading user data...</p>
      )}
    </div>
  );
}