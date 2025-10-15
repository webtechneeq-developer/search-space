import React from "react";
import Image from "next/image";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import Footer from "@/components/admin/Footer";
import StatCard from "@/components/common/StatCard";

export default function AdminDashboard() {
  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        <Header />

        {/* Main Content */}

        <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center p-4">
          
          {/* <Image
            src="https://placehold.co/400x400/0d6efd/ffffff?text=Welcome"
            alt="Welcome to the CMS"
            width={400}
            height={400}
            priority
            className="img-fluid mb-4 shadow rounded"
          /> */}
          <h1 className="display-5 fw-bold text-primary mb-3">
            Welcome to the Dashboard
          </h1>
          <p className="lead text-muted w-75 mx-auto">
            Please select an option from the sidebar menu to manage your content.
          </p>
          <StatCard />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
