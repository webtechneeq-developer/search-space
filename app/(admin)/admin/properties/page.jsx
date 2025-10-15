"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import Footer from "@/components/admin/Footer";

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch properties
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/properties");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setProperties(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Delete property
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const response = await fetch(`/api/properties/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete the property.");
        fetchProperties();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // Filtered results
  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className="alert alert-danger m-4">Error: {error}</div>;
  }

  // Main UI
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Header */}
      <Header />

      <div className="d-flex flex-grow-1">
        {/* Sidebar (fixed) */}
        <aside
          className="position-fixed top-0 start-0 vh-100 bg-white border-end"
          style={{ width: "250px", zIndex: 1000 }}
        >
          <Sidebar />
        </aside>

        {/* Main content */}
        <main
          className="flex-grow-1 p-4"
          style={{ marginLeft: "285px" }} // Leave space for fixed sidebar
        >
          {/* Page header */}

          {/* Card container */}

          {/* Table */}
          <div className="p-0">
            <div className="  border-0 rounded-4">
              {/* Search header */}
              <div className="card-header bg-white border-0 py-3">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <FaSearch />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-0"
                    placeholder="Search by title, city, or locality..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <h1 className="h2 fw-bold mb-0">Manage Properties</h1>
                <Link
                  href="/admin/properties/add"
                  className="btn btn-primary d-flex align-items-center"
                >
                  <FaPlus className="me-2" /> Add New Property
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ minWidth: "250px" }}>Title</th>
                      <th>City</th>
                      <th>Locality</th>
                      <th>Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProperties.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center text-muted py-4">
                          No properties found.
                        </td>
                      </tr>
                    ) : (
                      filteredProperties.map((property) => (
                        <tr key={property.id}>
                          <td>
                            <div className="fw-bold">{property.title}</div>
                            <div className="small text-muted">
                              ID: {property.id}
                            </div>
                          </td>
                          <td>{property.city}</td>
                          <td className="text-capitalize">
                            {property.subLocation}
                          </td>
                          <td>
                            {property.status === 1 ? (
                              <span className="badge bg-success-subtle border border-success-subtle text-success-emphasis rounded-pill">
                                <i className="bi bi-check-circle-fill me-1"></i>
                                Active
                              </span>
                            ) : (
                              <span className="badge bg-secondary-subtle border border-secondary-subtle text-secondary-emphasis rounded-pill">
                                <i className="bi bi-x-circle-fill me-1"></i>
                                Inactive
                              </span>
                            )}
                          </td>
                          <td className="text-end">
                            <Link
                              href={`/admin/properties/edit/${property.id}`}
                              className="btn btn-sm btn-outline-primary me-2"
                              title="Edit Property"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              title="Delete Property"
                              onClick={() => handleDelete(property.id)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
