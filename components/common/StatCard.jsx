"use client";
import React, { useEffect, useState } from "react";
import {
  FaBuilding,
  FaCity,
  FaThLarge,
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

  // Calculate stats
  const totalProperties = properties.length;

  const totalCities = new Set(
    properties.map((p) => p.city?.toLowerCase().trim())
  ).size;

  const totalTypes = new Set(
    properties.map((p) => p.type?.toLowerCase().trim())
  ).size;

  const stats = [
    {
      title: "Total Properties",
      value: totalProperties || 0,
      icon: <FaBuilding size={24} color="#fff" />,
      bg: "linear-gradient(45deg,#3498db,#2980b9)",
    },
    {
      title: "Total Cities",
      value: totalCities || 0,
      icon: <FaCity size={24} color="#fff" />,
      bg: "linear-gradient(45deg,#27ae60,#2ecc71)",
    },
    {
      title: "Types of Coworking Spaces",
      value: 7,
      icon: <FaThLarge size={24} color="#fff" />,
      bg: "linear-gradient(45deg,#e67e22,#f39c12)",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f5f7fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          stats.map((stat, index) => (
            <div
              key={index}
              style={{
                flex: "1 1 250px",
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                padding: "20px",
                minWidth: "250px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: stat.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px",
                  flexShrink: 0,
                }}
              >
                {stat.icon}
              </div>
              <div>
                <div
                  style={{
                    color: "#888",
                    fontSize: "0.9rem",
                    marginBottom: "5px",
                  }}
                >
                  {stat.title}
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    marginBottom: "5px",
                  }}
                >
                  {stat.value}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
