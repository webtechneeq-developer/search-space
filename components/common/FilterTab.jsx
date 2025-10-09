"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select from 'react-select';

export default function FilterTab({
  tabClass = "nav-tab-form style-1 justify-content-center",
  styleClass = "",
}) {
  const router = useRouter();

  const [selectedType, setSelectedType] = useState(null);
  const [location, setLocation] = useState(null);
  const [locality, setLocality] = useState(null);
  const [localityOptions, setLocalityOptions] = useState([]);

  const typeOptions = [
    { value: "coworking-office", label: "Private Office" },
    { value: "coworking-dedicated-desk", label: "Dedicated Desk" },
    { value: "coworking-flexi-desk", label: "Flexi Desk" },
    { value: "coworking-meeting-room", label: "Meeting Room" },
    { value: "coworking-conference-room", label: "Conference Room" },
    { value: "coworking-day-pass", label: "Day Pass" },
    { value: "coworking-virtual-office", label: "Virtual Office" },
  ];

  const locationOptions = [
    { value: "Mumbai", label: "Mumbai" },
    { value: "Navi Mumbai", label: "Navi Mumbai" },
    { value: "Pune", label: "Pune" },
  ];

  const locationToLocalitiesMap = {
    Mumbai: ["Andheri", "Kurla", "Lower Parel", "Malad"],
    "Navi Mumbai": ["Airoli"],
    Pune: ["Kharadi", "Magarpatta Road"],
  };

  useEffect(() => {
    if (location && locationToLocalitiesMap[location.value]) {
      setLocalityOptions(
        locationToLocalitiesMap[location.value].map(loc => ({ value: loc, label: loc }))
      );
    } else {
      setLocalityOptions([]);
    }
    setLocality(null);
  }, [location]);

  const createSlug = (text) => text ? text.toLowerCase().replace(/ /g, "-") : "";

  // UPDATED HANDLE SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();

    // A search is invalid only if BOTH type and location are missing.
    if (!selectedType && !location) {
      alert("Please select a space type or a location to begin your search.");
      return;
    }

    // Determine the type slug. Use the selected one, or default to 'coworking-office' if a location is selected without a type.
    const typeSlug = selectedType
      ? createSlug(selectedType.value)
      : "coworking-office";

    // Start building the path with the determined type.
    let path = `/${typeSlug}`;

    // Add location if it's selected.
    if (location) {
      path += `/${createSlug(location.value)}`;

      // Add locality only if location is also selected.
      if (locality) {
        path += `/${createSlug(locality.value)}`;
      }
    }

    // Push to the newly constructed URL.
    router.push(path);
  };

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '50px',
      border: 'none',
      boxShadow: 'none',
      backgroundColor: 'transparent',
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    placeholder: (provided) => ({ ...provided, color: '#6c757d' }),
  };

  return (
    <div className="flat-tab flat-tab-form">
      <div className="tab-content">
        <div className="tab-pane fade active show" role="tabpanel">
          <div className="form-sl">
            <form onSubmit={handleSubmit}>
              <div className={`wd-find-select ${styleClass}`}>
                <div className="inner-group">
                  <div className="form-group-1 search-form form-style">
                    {/* <label>Type</label> */}
                    <Select
                      styles={customSelectStyles}
                      options={typeOptions}
                      onChange={setSelectedType}
                      value={selectedType}
                      placeholder="Select Type..."
                      isSearchable={true}
                    />
                  </div>
                  <div className="form-group-2 form-style">
                    {/* <label>Location</label> */}
                    <Select
                      styles={customSelectStyles}
                      options={locationOptions}
                      onChange={setLocation}
                      value={location}
                      placeholder="Type to search Location..."
                      isSearchable={true}
                    />
                  </div>
                  <div className="form-group-3 form-style">
                    {/* <label>Locality</label> */}
                    <Select
                      styles={customSelectStyles}
                      options={localityOptions}
                      onChange={setLocality}
                      value={locality}
                      placeholder="Type to search Locality..."
                      isSearchable={true}
                      isDisabled={!location}
                    />
                  </div>
                </div>
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