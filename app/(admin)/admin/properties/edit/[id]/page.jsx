"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  FaPlus,
  FaTrash,
  FaBuilding,
  FaMapMarkerAlt,
  FaClock,
  FaRupeeSign,
  FaCheckSquare,
  FaImage,
  FaUpload,
  FaStar,
} from "react-icons/fa";

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params || {};

  const [property, setProperty] = useState(null);
  const [locationImageFile, setLocationImageFile] = useState(null);
  const [currentLocationImage, setCurrentLocationImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/properties/${id}`);
          if (!res.ok) throw new Error("Failed to fetch property data.");
          const data = await res.json();
          setProperty({ ...data, images: data.images || [] });
          setCurrentLocationImage(data.locationImage);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProperty();
    }
  }, [id]);

  const createSlug = (text) =>
    text
      ? text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      : "";

  useEffect(() => {
    if (property && property.title) {
      setProperty((prev) => ({ ...prev, slug: createSlug(prev.title) }));
    }
  }, [property?.title]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    const uploadedImages = [];
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
        uploadedImages.push({ name: result.filename, isMain: false });
      } catch (err) {
        setError(err.message);
      }
    }
    setProperty((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedImages],
    }));
    setUploading(false);
  };

  const setAsMainImage = (indexToSet) => {
    setProperty((prev) => ({
      ...prev,
      images: prev.images.map((img, index) => ({
        ...img,
        isMain: index === indexToSet,
      })),
    }));
  };

  const handlePricingChange = (index, e) => {
    const { name, value } = e.target;
    const newPricing = [...(property.pricing || [])];
    newPricing[index] = { ...newPricing[index], [name]: value };
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
        ...(prev.pricing || []),
        { type: "Dedicated Desk", price: "", unit: "/Month", seats: "" },
      ],
    }));

  const removePricingRow = (index) =>
    setProperty((prev) => ({
      ...prev,
      pricing: (prev.pricing || []).filter((_, i) => i !== index),
    }));

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setProperty((prev) => {
      const features = prev.features || [];
      const newFeatures = checked
        ? [...features, value]
        : features.filter((f) => f !== value);
      return { ...prev, features: newFeatures };
    });
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
        formData.append("location", "location");
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
        !finalPropertyData.images.some((img) => img.isMain || img.is_main_image)
      ) {
        throw new Error("Please select a main image for the property.");
      }

      const response = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPropertyData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update property");
      }
      router.push("/admin/properties");
    } catch (err) {
      setError(err.message || "An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
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
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!property) return <div>Property not found.</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Edit Property</h2>
        <Link href="/admin/properties" className="btn btn-outline-secondary">
          Back to Properties
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        {/* Core Information */}
        <div className="card1 shadow-sm mb-4">
          <div className="card1-header bg-light py-3 px-4 border-bottom">
            <h5 className="mb-0">
              <FaBuilding className="me-2 text-primary" /> Core Information
            </h5>
          </div>
          <div className="card1-body p-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  value={property.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="slug" className="form-label">
                  URL Slug (Auto-generated)
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  className="form-control bg-light"
                  value={property.slug}
                  readOnly
                />
              </div>
              <div className="col-12">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
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

        {/* Location */}
        <div className="card1 shadow-sm mb-4">
          <div className="card1-header bg-light py-3 px-4 border-bottom">
            <h5 className="mb-0">
              <FaMapMarkerAlt className="me-2 text-primary" /> Location
            </h5>
          </div>
          <div className="card1-body p-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="form-control"
                  value={property.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="subLocation" className="form-label">
                  Locality (lowercase)
                </label>
                <input
                  type="text"
                  id="subLocation"
                  name="subLocation"
                  className="form-control"
                  value={property.subLocation}
                  onChange={handleChange}
                  placeholder="e.g., andheri"
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="map" className="form-label">
                  Google Maps Embed URL
                </label>
                <input
                  type="text"
                  id="map"
                  name="map"
                  className="form-control"
                  value={property.map}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="locationImage" className="form-label">
                  Location Image
                </label>
                {currentLocationImage && !locationImageFile && (
                  <div className="mb-2">
                    <img
                      src={`/uploads/${currentLocationImage}`}
                      alt="Current location"
                      className="img-thumbnail"
                      style={{ maxWidth: "150px" }}
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="locationImage"
                  className="form-control"
                  onChange={(e) => setLocationImageFile(e.target.files[0])}
                />
                <div className="form-text">
                  Upload a new image to replace the current one for this
                  locality.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="card1 shadow-sm mb-4">
          <div className="card1-header bg-light py-3 px-4 border-bottom">
            <h5 className="mb-0">
              <FaClock className="me-2 text-primary" /> Property Details
            </h5>
          </div>
          <div className="card1-body p-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="workingHours" className="form-label">
                  Working Hours
                </label>
                <input
                  type="text"
                  id="workingHours"
                  name="workingHours"
                  className="form-control"
                  value={property.workingHours}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lockInPeriod" className="form-label">
                  Lock-in Period
                </label>
                <input
                  type="text"
                  id="lockInPeriod"
                  name="lockInPeriod"
                  className="form-control"
                  value={property.lockInPeriod}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="securityDeposit" className="form-label">
                  Security Deposit
                </label>
                <input
                  type="text"
                  id="securityDeposit"
                  name="securityDeposit"
                  className="form-control"
                  value={property.securityDeposit}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="advancePayment" className="form-label">
                  Advance Payment
                </label>
                <input
                  type="text"
                  id="advancePayment"
                  name="advancePayment"
                  className="form-control"
                  value={property.advancePayment}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="noticePeriod" className="form-label">
                  Notice Period
                </label>
                <input
                  type="text"
                  id="noticePeriod"
                  name="noticePeriod"
                  className="form-control"
                  value={property.noticePeriod}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* MEDIA SECTION */}
        <div className="card1 shadow-sm mb-4">
          <div className="card1-header bg-light py-3 px-4 border-bottom">
            <h5 className="mb-0">
              <FaImage className="me-2 text-primary" /> Media
            </h5>
          </div>
          <div className="card1-body p-4">
            <div className="mb-3">
              <label htmlFor="imageUpload" className="form-label">
                Upload New Images
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
              {property.images && property.images.length > 0 ? (
                <div className="row g-2">
                  {property.images.map((image, index) => (
                    <div key={index} className="col-md-4">
                      <div className="card position-relative">
                        <img
                          src={`/uploads/${image.name}`}
                          alt={`Uploaded ${index + 1}`}
                          className="card-img-top"
                          style={{ height: "120px", objectFit: "cover" }}
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
              ) : (
                <p className="text-muted small">
                  No images have been uploaded for this property yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="card1 shadow-sm mb-4">
          <div className="card1-header bg-light py-3 px-4 border-bottom">
            <h5 className="mb-0">
              <FaRupeeSign className="me-2 text-primary" /> Pricing Options
            </h5>
          </div>
          <div className="card1-body p-4">
            {(property.pricing || []).map((p, index) => (
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
                <div className="col-md-1">
                  <button
                    type="button"
                    className="btn btn-outline-danger w-100"
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

        {/* Features Section */}
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
                      role="switch"
                      value={feature}
                      id={`feature-${feature}`}
                      onChange={handleFeatureChange}
                      checked={(property.features || []).includes(feature)}
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
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
