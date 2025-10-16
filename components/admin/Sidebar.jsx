"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaThList } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    // REMOVED "position-fixed" from this className
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark vh-100"
      style={{
        width: "280px",
        height: "auto !important",
        background: "linear-gradient(to right, #004e92, #000428)",
      }}
    >
      <Link
        href="/admin"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">CMS Panel</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            href="/admin"
            className={`nav-link text-white ${
              pathname === "/admin" ? "active" : ""
            }`}
          >
            <FaTachometerAlt className="me-2" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/admin/properties"
            className={`nav-link text-white ${
              pathname.startsWith("/admin/properties") ? "active" : ""
            }`} 
          >
            <FaThList className="me-2" />
            Properties
          </Link>
        </li>
        <li>
          <Link
            href="/admin/footer"
            className={`nav-link text-white ${
              pathname.startsWith("/admin/footer") ? "active" : ""
            }`}
          >
            <FaThList className="me-2" />
            Footer
          </Link>
        </li>
      </ul>
      <hr />
    </div>
  );
}
