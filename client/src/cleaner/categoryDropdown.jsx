import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";
import "./categoryDropdown.css";

export default function CategoryDropdown({
  selectedCategories,
  onChange,
  availableCategories = []
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null); // ✅ added missing useRef

  // Filter categories based on search
  const filteredCategories = availableCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown if clicked outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Handle selection toggle
  const toggleCategory = (id) => {
    const updated = selectedCategories.includes(id)
      ? selectedCategories.filter((catId) => catId !== id)
      : [...selectedCategories, id];
    onChange(updated);
  };

  return (
    <div className="dropdown-wrapper" ref={dropdownRef}>
      <button className="dropdown-button5" onClick={() => setIsOpen(!isOpen)}>
        <span>
          {selectedCategories.length > 0
            ? `${selectedCategories.length} selected`
            : "Select Category"}
        </span>
        <ChevronDown className={`dropdown-arrow ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-search">
                <svg
                    className="search-icon2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="10"></circle>
                    <line x1="22" y1="22" x2="19.65" y2="19.65"></line>
                </svg>
            <input
              type="text"
              placeholder="Search Category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="dropdown-list3">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <label key={cat.id} className="dropdown-item">
                  <input
                    className="forpadding" type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                  />
                  {cat.name}
                </label>
              ))
            ) : (
              <div className="dropdown-item">No categories found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}