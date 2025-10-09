"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleDelete = async (id) => {
    // Show a confirmation dialog before deleting
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const response = await fetch(`/api/properties/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete the property.");
        }
        // Refresh the properties list after successful deletion
        fetchProperties();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // Filter properties based on the search term
  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h1 className="h2 fw-bold mb-0">Manage Properties</h1>
        <Link
          href="/admin/properties/add"
          className="btn btn-primary d-flex align-items-center"
        >
          <FaPlus className="me-2" /> Add New Property
        </Link>
      </div>

      <div className="card border-0 shadow-sm" style={{ borderRadius: "1rem" }}>
        <div className="card-header bg-white border-0 pt-4 pb-0">
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
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ minWidth: "300px" }}>
                    Title
                  </th>
                  <th scope="col">City</th>
                  <th scope="col">Locality</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((property) => (
                  <tr key={property.id}>
                    <td>
                      <div className="fw-bold">{property.title}</div>
                      <div className="small text-muted">ID: {property.id}</div>
                    </td>
                    <td>{property.city}</td>
                    <td className="text-capitalize">{property.subLocation}</td>
                    <td>
                      {property.status === 1 ? (
                        <span className="badge bg-success-subtle border border-success-subtle text-success-emphasis rounded-pill">
                          <i className="bi bi-check-circle-fill me-1"></i>Active
                        </span>
                      ) : (
                        <span className="badge bg-secondary-subtle border border-secondary-subtle text-secondary-emphasis rounded-pill">
                          <i className="bi bi-x-circle-fill me-1"></i>Inactive
                        </span>
                      )}
                    </td>
                    <td className="text-end">
                      {/* CORRECTED: Changed <button> to <Link> for editing */}
                      <Link
                        href={`/admin/properties/edit/${property.id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                        title="Edit Property"
                      >
                        <FaEdit />
                      </Link>
                      {/* CORRECTED: Added onClick handler for deleting */}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Delete Property"
                        onClick={() => handleDelete(property.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
