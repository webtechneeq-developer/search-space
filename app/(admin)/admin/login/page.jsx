"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image"; // Import Next.js Image component

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
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 p-0">
      <div className="row g-0 h-100">
        {/* Branding Column */}
        <div className="col-lg-7 d-none d-lg-block">
          <div
            className="h-100 d-flex flex-column justify-content-center p-5 text-white"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* <div
              style={{ backgroundColor: "rgba(13, 110, 253, 0.7)" }}
              className="position-absolute top-0 start-0 end-0 bottom-0"
            ></div> */}
            <div className="position-relative">
              <h1 className="display-4 fw-bold">Search Spaces</h1>
              <p className="lead">Content Management System</p>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="col-lg-5 d-flex flex-column align-items-center justify-content-center bg-light">
          <div
            className="card border-0 shadow-lg"
            style={{ width: "25rem", borderRadius: "1rem" }}
          >
            <div className="card-body p-5">
              <h2 className="card-title text-center fw-bold mb-4">
                Admin Sign In
              </h2>
              <form onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                </div>

                {error && <p className="text-danger small mb-3">{error}</p>}

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
  );
}
