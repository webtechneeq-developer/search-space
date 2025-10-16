"use client";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import Footer from "@/components/admin/Footer";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaSave, FaUpload } from "react-icons/fa";

export default function FooterCMS() {
  const [settings, setSettings] = useState({
    about_text: "",
    phone_number: "",
    email: "",
    facebook_url: "",
    linkedin_url: "",
    twitter_url: "",
    instagram_url: "",
    youtube_url: "",
    copyright_text: "",
    logo_image_name: "", // Add logo field to state
  });

  const [companyLinks, setCompanyLinks] = useState([]);
  const [serviceLinks, setServiceLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [footerLogoFile, setFooterLogoFile] = useState(null); // State for the new logo file

  // Fetch Footer Settings
  useEffect(() => {
    fetch("/api/settings/footer")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data.settings || {});
        setCompanyLinks(data.companyLinks || []);
        setServiceLinks(data.servicesLinks || []);
      })
      .catch((err) => console.error("Error fetching footer data:", err))
      .finally(() => setLoading(false));
  }, []);

  // Handle field changes
  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  // Handle link updates
  const handleLinkChange = (listSetter, index, field, value) => {
    listSetter((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const addLink = (listSetter, category) => {
    listSetter((prev) => [
      ...prev,
      { title: "", url: "", category, display_order: prev.length + 1 },
    ]);
  };

  const removeLink = (listSetter, index) => {
    listSetter((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit all updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalSettings = { ...settings };

      // If a new logo file was selected, upload it first
      if (footerLogoFile) {
        const formData = new FormData();
        formData.append("file", footerLogoFile);
        formData.append("location", "logo"); // A generic folder for logos
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) throw new Error("Logo image upload failed.");
        const uploadData = await uploadRes.json();
        // Update the logo name in the settings object before saving
        finalSettings.logo_image_name = uploadData.filename;
      }

      const res = await fetch("/api/settings/footer", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settings: finalSettings,
          companyLinks,
          servicesLinks: serviceLinks,
        }),
      });

      const data = await res.json();

      // Update local state to show the new logo immediately
      setSettings(finalSettings);
      setFooterLogoFile(null); // Clear the file input
      alert(data.message || "Footer updated successfully!");
    } catch (error) {
      console.error("Error updating footer:", error);
      alert("Failed to update footer settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="d-flex flex-grow-1">
        {/* Sidebar (fixed) */}
        <aside
          className="position-fixed top-0 start-0 vh-100 bg-white border-end"
          style={{ width: "250px", zIndex: 99999 }}
        >
          <Sidebar />
        </aside>
        <main
          className="flex-grow-1 p-4"
          style={{ marginLeft: "285px" }} // Leave space for fixed sidebar
        >
          <div className="container-fluid">
            <h2 className="mb-4 fw-bold text-primary">Footer CMS</h2>
            <form onSubmit={handleSubmit}>
              <div className="card1 mb-4 shadow-sm border-0">
                <div className="card1-header bg-primary text-white fw-semibold px-4 py-2 rounded-top">
                  About & Contact
                </div>
                <div className="card1-body p-4">
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Footer Logo
                    </label>
                    {settings.logo_image_name && !footerLogoFile && (
                      <div className="mb-2">
                        <img
                          src={`/uploads/${settings.logo_image_name}`}
                          alt="Current footer logo"
                          className="img-thumbnail"
                          style={{ maxHeight: "40px" }}
                        />
                      </div>
                    )}
                    <div className="input-group">
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setFooterLogoFile(e.target.files[0])}
                        accept="image/png, image/jpeg, image/svg+xml"
                      />
                      <span className="input-group-text">
                        <FaUpload />
                      </span>
                    </div>
                    <div className="form-text">
                      Upload a new logo to replace the current one.
                    </div>
                  </div>
                  <hr />
                  <div className="mb-3">
                    <label className="form-label fw-semibold">About Text</label>
                    <textarea
                      className="form-control"
                      name="about_text"
                      value={settings.about_text || ""}
                      onChange={handleSettingChange}
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone_number"
                        value={settings.phone_number || ""}
                        onChange={handleSettingChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={settings.email || ""}
                        onChange={handleSettingChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card1 mb-4 shadow-sm border-0">
                <div className="card1-header bg-primary text-white fw-semibold px-4 py-2 rounded-top">
                  Social Media Links
                </div>
                <div className="card1-body p-4">
                  <div className="row g-3">
                    {[
                      "facebook",
                      "linkedin",
                      "twitter",
                      "instagram",
                      "youtube",
                    ].map((platform) => (
                      <div className="col-md-6" key={platform}>
                        <label className="form-label fw-semibold text-capitalize">
                          {platform} URL
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name={`${platform}_url`}
                          value={settings[`${platform}_url`] || ""}
                          onChange={handleSettingChange}
                          placeholder={`Enter ${platform} URL`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card1 mb-4 shadow-sm border-0">
                <div className="card1-header bg-primary text-white fw-semibold px-4 py-2 d-flex justify-content-between align-items-center rounded-top">
                  <span>Our Company Links</span>
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={() => addLink(setCompanyLinks, "Our Company")}
                  >
                    <FaPlus /> Add Link
                  </button>
                </div>
                <div className="card1-body p-4">
                  {companyLinks.length > 0 ? (
                    companyLinks.map((link, index) => (
                      <div
                        key={index}
                        className="row g-2 align-items-center mb-2"
                      >
                        <div className="col-md-5">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            value={link.title || ""}
                            onChange={(e) =>
                              handleLinkChange(
                                setCompanyLinks,
                                index,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="col-md-5">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="URL"
                            value={link.url || ""}
                            onChange={(e) =>
                              handleLinkChange(
                                setCompanyLinks,
                                index,
                                "url",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="col-md-2 text-center">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeLink(setCompanyLinks, index)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No company links yet.</p>
                  )}
                </div>
              </div>

              <div className="card1 mb-4 shadow-sm border-0">
                <div className="card1-header bg-primary text-white fw-semibold px-4 py-2 d-flex justify-content-between align-items-center rounded-top">
                  <span>Services Links</span>
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={() => addLink(setServiceLinks, "Services")}
                  >
                    <FaPlus /> Add Link
                  </button>
                </div>
                <div className="card1-body p-4">
                  {serviceLinks.length > 0 ? (
                    serviceLinks.map((link, index) => (
                      <div
                        key={index}
                        className="row g-2 align-items-center mb-2"
                      >
                        <div className="col-md-5">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            value={link.title || ""}
                            onChange={(e) =>
                              handleLinkChange(
                                setServiceLinks,
                                index,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="col-md-5">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="URL"
                            value={link.url || ""}
                            onChange={(e) =>
                              handleLinkChange(
                                setServiceLinks,
                                index,
                                "url",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="col-md-2 text-center">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeLink(setServiceLinks, index)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No services links yet.</p>
                  )}
                </div>
              </div>

              <div className="card1 mb-4 shadow-sm border-0">
                <div className="card1-header bg-primary text-white fw-semibold px-4 py-2 rounded-top">
                  Copyright
                </div>
                <div className="card1-body p-4">
                  <input
                    type="text"
                    className="form-control"
                    name="copyright_text"
                    value={settings.copyright_text || ""}
                    onChange={handleSettingChange}
                    placeholder="© 2025 Your Company. All rights reserved."
                  />
                </div>
              </div>

              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-success px-4 py-2 fw-semibold"
                  disabled={saving}
                >
                  <FaSave className="me-2" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
