"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaUserCircle, FaCog, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This effect checks the session storage when the component mounts
  // or when the user navigates to a new page.
  useEffect(() => {
    const status = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(status);
  }, [pathname]); // Re-check on every route change

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    sessionStorage.removeItem("isLoggedIn"); // Clear the client-side flag
    router.push("/admin/login");
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid">
        <div className="ms-auto">
          {isLoggedIn ? (
            // If logged in, show the user dropdown with a Logout option
            <div className="dropdown">
              <button
                className="btn btn-light d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCircle size={24} className="me-2" />
                <span className="d-none d-sm-inline">Admin</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    <FaCog className="me-2" />
                    Change Password
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // If logged out, show a simple Login button
            <Link
              href="/admin/login"
              className="btn btn-primary d-flex align-items-center"
            >
              <FaSignInAlt className="me-2" />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
