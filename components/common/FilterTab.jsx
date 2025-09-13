"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import DropdownSelect from "./DropdownSelect";

export default function FilterTab({
  tabClass = "nav-tab-form style-1 justify-content-center",
  styleClass = "",
}) {
  const ddContainer = useRef();
  const advanceBtnRef = useRef();
  const router = useRouter();

  // State for form inputs
  const [selectedType, setSelectedType] = useState("");
  const [location, setLocation] = useState("");
  const [locality, setLocality] = useState("");
  const [localityOptions, setLocalityOptions] = useState(["Select Localities"]);

  // Map locations to their respective localities
  const locationToLocalitiesMap = {
    Mumbai: ["Andheri", "Kurla", "Lower Parel", "Malad"],
    "Navi Mumbai": ["Airoli"],
    Pune: ["Kharadi", "Magarpatta Road"],
  };

  // Update locality options whenever location changes
  useEffect(() => {
    if (locationToLocalitiesMap[location]) {
      setLocalityOptions([
        "Select Localities",
        ...locationToLocalitiesMap[location],
      ]);
      setLocality(""); // reset selected locality when location changes
    } else {
      setLocalityOptions(["Select Localities"]);
      setLocality("");
    }
  }, [location]);

  // Handle outside click for advanced search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ddContainer.current &&
        !ddContainer.current.contains(event.target) &&
        advanceBtnRef.current &&
        !advanceBtnRef.current.contains(event.target)
      ) {
        ddContainer.current?.classList.remove("show");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location && selectedType) {
      const query = new URLSearchParams({
        location: location.toLowerCase(),
        type: selectedType,
        locality: locality.toLowerCase(),
      }).toString();
      router.push(`/properties?${query}`);
    } else {
      alert("Please select both location and type.");
    }
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
                          "Private Office",
                          "Co-Working Office",
                          "Co-Working Dedicated Desk",
                          "Co-Working Flexi Desk",
                          "Co-Working Meeting Room",
                          "Co-Working Conference Room",
                          "Co-Working Day Pass",
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
