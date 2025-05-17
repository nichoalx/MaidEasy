import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";
import "./HOcategoryDropdown.css";

export default function HOCategoryDropdown({
  selectedCategories,
  onChange,
  availableCategories = []
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // ✅ Filter categories safely
  const filteredCategories = (availableCategories || []).filter(
    (cat) => cat?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ✅ Handle selection toggle
  const toggleCategory = (id) => {
    const updated = selectedCategories.includes(id)
      ? selectedCategories.filter((catId) => catId !== id)
      : [...selectedCategories, id];
    onChange(updated);
  };

  return (
    <div className="ho-dropdown-wrapper" ref={dropdownRef}>
      <button className="ho-dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        <span>
          {selectedCategories.length > 0
            ? `${selectedCategories.length} selected`
            : "Select Category"}
        </span>
        <ChevronDown className={`ho-dropdown-arrow ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <div className="ho-dropdown-menu">
          <div className="ho-dropdown-search">
            <Search className="ho-search-icon" />
            <input
              type="text"
              placeholder="Search Category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="ho-dropdown-list">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <label key={cat.id || cat.name} className="ho-dropdown-item">
                  <input
                    className="ho-forpadding"
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                  />
                  {cat.name || "Unnamed"}
                </label>
              ))
            ) : (
              <div className="ho-dropdown-item">No categories found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
