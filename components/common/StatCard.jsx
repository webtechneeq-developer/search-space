"use client";
import React, { useEffect, useState } from "react";
import { FaBuilding, FaCity, FaBlog } from "react-icons/fa";

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
  const blogCount = 24; // replace with dynamic blog API if available

  const stats = [
    {
      title: "Total Properties",
      value: propertyCount,
      icon: <FaBuilding size={24} color="#fff" />,
      bg: "linear-gradient(135deg,#6a11cb,#2575fc)",
    },
    {
      title: "Cities Covered",
      value: cityCount,
      icon: <FaCity size={24} color="#fff" />,
      bg: "linear-gradient(135deg,#43e97b,#38f9d7)",
    },
    {
      title: "Total Blogs",
      value: blogCount,
      icon: <FaBlog size={24} color="#fff" />,
      bg: "linear-gradient(135deg,#f7971e,#ffd200)",
    },
  ];

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light py-5"
      style={{ width: "100%" }}
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
                  className="d-flex align-items-center p-4 rounded-3 shadow-lg stat-card"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    minHeight: "150px",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle me-4"
                    style={{
                      width: "70px",
                      height: "70px",
                      background: stat.bg,
                      flexShrink: 0,
                      boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div style={{ fontSize: "22px", color:"#FFF" }}>
                    <div className="fw-bold mb-2">{stat.title}</div>
                    <div className="fs-3 fw-bold mt-3">{stat.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .stat-card {
        background: #000428;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #004e92, #000428);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #004e92, #000428); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */ 
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .stat-card .fs-3 {
          font-size: 1.5rem;
        }

        .stat-card .small {
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
