"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DropdownSelect from "./DropdownSelect";

export default function FilterTab({
  tabClass = "nav-tab-form style-1 justify-content-center",
  styleClass = "",
}) {
  const router = useRouter();

  // State for form inputs
  const [selectedType, setSelectedType] = useState("");
  const [location, setLocation] = useState("");
  const [locality, setLocality] = useState("");
  const [localityOptions, setLocalityOptions] = useState(["Select Localities"]);

  // Map locations to their respective localities
  const locationToLocalitiesMap = {
    Mumbai: ["andheri", "kurla", "lower-parel", "malad"],
    "Navi Mumbai": ["airoli"],
    Pune: ["kharadi", "magarpatta-road"],
  };

  // Update locality options whenever location changes
  useEffect(() => {
    if (locationToLocalitiesMap[location]) {
      setLocalityOptions([
        "Select Localities",
        ...locationToLocalitiesMap[location].map(
          (loc) => loc.charAt(0).toUpperCase() + loc.slice(1)
        ), // Capitalize options
      ]);
    } else {
      setLocalityOptions(["Select Localities"]);
    }
    setLocality(""); // Reset selected locality when location changes
  }, [location]);

  // Helper function to create URL-friendly slugs
  const createSlug = (text) => {
    if (!text) return "";
    return text.toLowerCase().replace(/ /g, "-");
  };

  // UPDATED Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedType || selectedType === "Select Type") {
      alert("Please select a space type to begin your search.");
      return;
    }

    // Start building the path
    let path = `/${createSlug(selectedType)}`;

    // Add location if it's selected
    if (location && location !== "Select Location") {
      path += `/${createSlug(location)}`;

      // Add locality ONLY if location is also selected
      if (locality && locality !== "Select Localities") {
        path += `/${createSlug(locality)}`;
      }
    }

    // Push to the newly constructed URL
    router.push(path);
  };

  return (
    <div className="flat-tab flat-tab-form">
      <div className="tab-content">
        <div className="tab-pane fade active show" role="tabpanel">
          <div className="form-sl">
            <form onSubmit={handleSubmit}>
              <div className={`wd-find-select ${styleClass}`}>
                <div className="inner-group">
                  {/* Type Dropdown */}
                  <div className="form-group-1 search-form form-style">
                    <label>Type</label>
                    <div className="group-select">
                      <DropdownSelect
                        onChange={(value) => setSelectedType(value)}
                        options={[
                          "Select Type",
                          "Coworking Office",
                          "Coworking Dedicated Desk",
                          "Coworking Flexi Desk",
                          "Coworking Meeting Room",
                          "Coworking Conference Room",
                          "Coworking Day Pass",
                          "Virtual Office",
                        ]}
                      />
                    </div>
                  </div>

                  {/* Location Dropdown */}
                  <div className="form-group-2 form-style">
                    <label>Location</label>
                    <div className="group-select">
                      <DropdownSelect
                        onChange={(value) => setLocation(value)}
                        options={[
                          "Select Location",
                          "Mumbai",
                          "Navi Mumbai",
                          "Pune",
                        ]}
                      />
                    </div>
                  </div>

                  {/* Locality Dropdown */}
                  <div className="form-group-3 form-style">
                    <label>Locality</label>
                    <div className="group-select">
                      <DropdownSelect
                        onChange={(value) => setLocality(value)}
                        options={localityOptions}
                      />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <div className="box-btn-advanced">
                  <button type="submit" className="tf-btn btn-search primary">
                    Search <i className="icon icon-search" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
