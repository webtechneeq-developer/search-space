"use client";
import React, { useEffect, useState } from "react";
import {
  FaBuilding,
  FaCity,
  FaThLarge,
  FaBlog,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Derived stats
  const propertyCount = properties.length;
  const cityCount = new Set(properties.map((p) => p.city)).size;
  const coworkingTypes = new Set(properties.map((p) => p.type)).size;
  const blogCount = 24; // replace with dynamic blog API if available

  const stats = [
    {
      title: "Total Properties",
      value: propertyCount,
      icon: <FaBuilding size={24} color="#fff" />,
      bg: "linear-gradient(45deg,#3498db,#2980b9)",
    },
    {
      title: "Cities Covered",
      value: cityCount,
      icon: <FaCity size={24} color="#fff" />,
      bg: "linear-gradient(45deg,#27ae60,#2ecc71)",
    },
    // {
    //   title: "Coworking Types",
    //   value: coworkingTypes,
    //   icon: <FaThLarge size={24} color="#fff" />,
    //   bg: "linear-gradient(45deg,#e67e22,#f39c12)",
    // },
    {
      title: "Total Blogs",
      value: blogCount,
      icon: <FaBlog size={24} color="#fff" />,
      bg: "linear-gradient(45deg,#9b59b6,#8e44ad)",
    },
  ];

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ padding: "20px", width:"100" }}
    >
      <div className="container">
        {loading && (
          <div className="text-center text-secondary py-5">Loading...</div>
        )}
        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        {!loading && !error && (
          <div className="row g-4 justify-content-center">
            {stats.map((stat, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-4">
                <div
                  className="d-flex align-items-center p-3 shadow-sm rounded"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    borderRadius: "12px",
                    minHeight: "110px",
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle me-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      background: stat.bg,
                      flexShrink: 0,
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-muted small mb-1">{stat.title}</div>
                    <div className="fs-4 fw-bold">{stat.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
