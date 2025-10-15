"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaPlus,
  FaTrash,
  FaBuilding,
  FaMapMarkerAlt,
  FaClock,
  FaImage,
  FaUpload,
  FaStar,
  FaRupeeSign,
  FaCheckSquare,
} from "react-icons/fa";

export default function AddPropertyPage() {
  const router = useRouter();
  const [property, setProperty] = useState({
    title: "",
    slug: "",
    description: "",
    city: "Mumbai",
    subLocation: "",
    workingHours: "Mon-Sat: 9AM - 9PM",
    lockInPeriod: "1 Month",
    securityDeposit: "1 Month",
    advancePayment: "1 Month",
    noticePeriod: "1 Month",
    map: "",
    pricing: [{ type: "Private Office", price: "", unit: "/Month", seats: "" }],
    features: [],
    images: [], // Holds info about uploaded property images
  });

  const [locationImageFile, setLocationImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const allPossibleFeatures = [
    "High Speed Wifi",
    "Meeting Rooms",
    "Ergo Workstations",
    "Printer",
    "Car / Bike Parking",
    "Pantry",
    "Housekeeping",
    "Reception",
    "Air Condition",
    "Tea / Coffee",
    "Phone Booth",
    "Lounge",
    "Projector",
  ];
  const pricingTypeOptions = [
    "Private Office",
    "Dedicated Desk",
    "Flexi Desk",
    "Meeting Room",
    "Conference Room",
    "Virtual Office",
    "Day Pass",
  ];

  const createSlug = (text) =>
    text
      ? text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      : "";

  useEffect(() => {
    setProperty((prev) => ({ ...prev, slug: createSlug(prev.title) }));
  }, [property.title]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    setError("");
    const uploadedImageNames = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("location", property.subLocation || "property");
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) throw new Error(`Upload failed for ${file.name}`);
        const result = await response.json();
        uploadedImageNames.push(result.filename);
      } catch (err) {
        setError(err.message);
        break;
      }
    }
    setProperty((prev) => {
      const newImages = uploadedImageNames.map((name, index) => ({
        name: name,
        isMain: prev.images.every((img) => !img.isMain) && index === 0,
      }));
      return { ...prev, images: [...prev.images, ...newImages] };
    });
    setUploading(false);
  };

  const setAsMainImage = (indexToSet) =>
    setProperty((prev) => ({
      ...prev,
      images: prev.images.map((img, index) => ({
        ...img,
        isMain: index === indexToSet,
      })),
    }));
  const handlePricingChange = (index, e) => {
    const { name, value } = e.target;
    const newPricing = [...property.pricing];
    newPricing[index][name] = value;
    setProperty((prev) => ({ ...prev, pricing: newPricing }));
  };
  const removeImage = (indexToRemove) =>
    setProperty((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  const addPricingRow = () =>
    setProperty((prev) => ({
      ...prev,
      pricing: [
        ...prev.pricing,
        { type: "Dedicated Desk", price: "", unit: "/Month", seats: "" },
      ],
    }));
  const removePricingRow = (index) =>
    setProperty((prev) => ({
      ...prev,
      pricing: property.pricing.filter((_, i) => i !== index),
    }));
  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setProperty((prev) => ({
      ...prev,
      features: checked
        ? [...prev.features, value]
        : prev.features.filter((f) => f !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let finalPropertyData = { ...property };
      if (locationImageFile) {
        const formData = new FormData();
        formData.append("file", locationImageFile);
        formData.append("location", property.subLocation || property.city);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) throw new Error("Location image upload failed.");
        const uploadData = await uploadRes.json();
        finalPropertyData.locationImageName = uploadData.filename;
      }
      if (
        finalPropertyData.images.length > 0 &&
        !finalPropertyData.images.some((img) => img.isMain)
      ) {
        throw new Error("Please select a main image for the property.");
      }
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPropertyData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create property");
      }
      router.push("/admin/properties");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Add New Property</h2>
        <Link href="/admin/properties" className="btn btn-outline-secondary">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="card1 shadow-sm mb-4">
          <div className="card1-header bg-light py-3 px-4 border-bottom">
            <h5 className="mb-0">
              <FaBuilding className="me-2 text-primary" /> Core Information
            </h5>
          </div>
          <div className="card1-body p-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={property.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">URL Slug (Auto)</label>
                <input
                  type="text"
                  name="slug"
                  className="form-control bg-light"
                  value={property.slug}
                  readOnly
                />
              </div>
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  value={property.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="card1 shadow-sm mb-4">
          <div className="card1-header bg-light py-3 px-4 border-bottom">
            <h5 className="mb-0">
              <FaMapMarkerAlt className="me-2 text-primary" /> Location Details
            </h5>
          </div>
          <div className="card1-body p-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="e.g., Mumbai"
                  value={property.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Locality</label>
                <input
                  type="text"
                  name="subLocation"
                  className="form-control"
                  placeholder="e.g., andheri"
                  value={property.subLocation}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Google Maps Embed URL</label>
                <input
                  type="text"
                  name="map"
                  className="form-control"
                  value={property.map}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="locationImage" className="form-label">
                  Location Image (for city/locality cards)
                </label>
                <input
                  type="file"
                  id="locationImage"
                  className="form-control"
                  onChange={(e) => setLocationImageFile(e.target.files[0])}
                />
                <div className="form-text">
                  Only upload an image here if this is a NEW city or locality.
                  This will set its display image across the site.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card1 shadow-sm mb-4">
          <div className="card1-header bg-light py-3 px-4 border-bottom">
            <h5 className="mb-0">
              <FaClock className="me-2 text-primary" /> Property Details
            </h5>
          </div>
          <div className="card1-body p-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Working Hours</label>
                <input
                  type="text"
                  name="workingHours"
                  className="form-control"
                  value={property.workingHours}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Lock-in Period</label>
                <input
                  type="text"
                  name="lockInPeriod"
                  className="form-control"
                  value={property.lockInPeriod}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Security Deposit</label>
                <input
                  type="text"
                  name="securityDeposit"
                  className="form-control"
                  value={property.securityDeposit}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Advance Payment</label>
                <input
                  type="text"
                  name="advancePayment"
                  className="form-control"
                  value={property.advancePayment}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Notice Period</label>
                <input
                  type="text"
                  name="noticePeriod"
                  className="form-control"
                  value={property.noticePeriod}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card1 shadow-sm mb-4">
          <div className="card1-header bg-light py-3 px-4 border-bottom">
            <h5 className="mb-0">
              <FaImage className="me-2 text-primary" /> Media
            </h5>
          </div>
          <div className="card1-body p-4">
            <div className="mb-3">
              <label htmlFor="imageUpload" className="form-label">
                Upload Property Images
              </label>
              <div className="input-group">
                <input
                  type="file"
                  id="imageUpload"
                  className="form-control"
                  onChange={handleFileChange}
                  multiple
                  disabled={uploading}
                />
                <span className="input-group-text">
                  <FaUpload />
                </span>
              </div>
              {uploading && (
                <div
                  className="spinner-border spinner-border-sm text-primary mt-2"
                  role="status"
                >
                  <span className="visually-hidden">Uploading...</span>
                </div>
              )}
            </div>
            <hr />
            <div className="mt-3">
              <label className="form-label">Uploaded Images</label>
              {property.images.length === 0 ? (
                <p className="text-muted small">
                  No images uploaded yet. The first image you upload will be the
                  main image.
                </p>
              ) : (
                <div className="row g-2">
                  {property.images.map((image, index) => (
                    <div key={index} className="col-md-4">
                      <div className=" position-relative">
                        <img
                          src={`/uploads/${image.name}`}
                          alt={`Uploaded ${index + 1}`}
                          className="card-img-top"
                          style={{ height: "auto", objectFit: "cover" }}
                        />
                        {image.isMain && (
                          <FaStar
                            className="position-absolute top-0 start-0 m-2 text-warning"
                            size={20}
                            title="Main Image"
                          />
                        )}
                        <div className="card-body p-2 d-flex justify-content-between">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-success"
                            title="Set as main"
                            onClick={() => setAsMainImage(index)}
                            disabled={image.isMain}
                          >
                            <FaStar />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            title="Remove"
                            onClick={() => removeImage(index)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card1 shadow-sm mb-4">
          <div className="card1-header bg-light py-3 px-4 border-bottom">
            <h5 className="mb-0">
              <FaRupeeSign className="me-2 text-primary" /> Pricing Options
            </h5>
          </div>
          <div className="card1-body p-4">
            {property.pricing.map((p, index) => (
              <div key={index} className="row g-2 align-items-center mb-2">
                <div className="col-md-4">
                  <select
                    name="type"
                    className="form-select"
                    value={p.type}
                    onChange={(e) => handlePricingChange(index, e)}
                  >
                    {pricingTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    name="price"
                    type="number"
                    className="form-control"
                    value={p.price}
                    onChange={(e) => handlePricingChange(index, e)}
                    placeholder="Price"
                  />
                </div>
                <div className="col-md-2">
                  <select
                    name="unit"
                    className="form-select"
                    value={p.unit}
                    onChange={(e) => handlePricingChange(index, e)}
                  >
                    <option value="/Month">/Month</option>
                    <option value="/Hour">/Hour</option>
                    <option value="/Day">/Day</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <input
                    name="seats"
                    type="number"
                    className="form-control"
                    value={p.seats}
                    onChange={(e) => handlePricingChange(index, e)}
                    placeholder="Seats"
                  />
                </div>
                <div className="col-md-1 text-center">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => removePricingRow(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline-primary btn-sm mt-2"
              onClick={addPricingRow}
            >
              <FaPlus className="me-1" /> Add Pricing Tier
            </button>
          </div>
        </div>

        <div className="card1 shadow-sm mb-4">
          <div className="card1-header bg-light py-3 px-4 border-bottom">
            <h5 className="mb-0">
              <FaCheckSquare className="me-2 text-primary" /> Amenities /
              Features
            </h5>
          </div>
          <div className="card1-body p-4">
            <div className="row">
              {allPossibleFeatures.map((feature) => (
                <div className="col-md-4" key={feature}>
                  <div className="form-check form-switch mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={feature}
                      id={`feature-${feature}`}
                      onChange={handleFeatureChange}
                      checked={property.features.includes(feature)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`feature-${feature}`}
                    >
                      {feature}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="text-end mt-4">
          <button
            type="submit"
            className="btn btn-primary btn-lg px-5"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Property"}
          </button>
        </div>
      </form>
    </div>
  );
}
