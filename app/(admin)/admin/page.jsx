import React from "react";
import Image from "next/image";

export default function AdminDashboard() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center">
      <Image
        src="https://placehold.co/400x400/0d6efd/ffffff?text=Welcome"
        alt="Welcome to the CMS"
        width={400}
        height={400}
        priority
        className="img-fluid mb-4"
        style={{ borderRadius: "1rem" }}
      />
      <h1 className="display-5 fw-bold">Welcome to the Dashboard</h1>
      <p className="lead text-muted">
        Please select an option from the sidebar menu to manage your content.
      </p>
    </div>
  );
}
