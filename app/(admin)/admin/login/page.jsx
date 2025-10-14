"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        sessionStorage.setItem("isLoggedIn", "true");
        router.push("/admin");
      } else {
        const data = await response.json();
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="login-bg-img"
      style={{

        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="container-fluid p-0"
        style={{
          minHeight: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: soft overlay for readability
        }}
      >
        <div className="row g-0 h-100" style={{ minHeight: "100vh" }}>
          {/* Branding Column */}
          <div className="col-lg-7 d-none d-lg-flex align-items-center justify-content-center text-white">
            <div className="p-5 text-center">
              <Image
                src="/images/logo/Search-Spaces-Logo.png"
                alt="Search Spaces Logo"
                width={300}
                height={300}
                style={{
                  objectFit: "contain",
                  marginBottom: "1rem",
                }}
              />
              <h1 className="fw-bold mb-2" style={{fontSize: "35px",

              }}>Content Management System</h1>
              {/* <p className="lead mb-0">Content Management System</p> */}
            </div>
          </div>

          {/* Form Column */}
          <div className="col-lg-5 d-flex align-items-center justify-content-center bg-light bg-opacity-90">
            <div
              className="card border-0 shadow-lg"
              style={{
                width: "25rem",
                borderRadius: "1rem",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <div className="card-body p-5">
                <h2 className="card-title text-center fw-bold mb-4">
                  Admin Sign In
                </h2>

                <form onSubmit={handleLogin}>
                  {/* Username */}
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="username">Username</label>
                  </div>

                  {/* Password */}
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>

                  {/* Error message */}
                  {error && <p className="text-danger small mb-3">{error}</p>}

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 rounded-pill"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
