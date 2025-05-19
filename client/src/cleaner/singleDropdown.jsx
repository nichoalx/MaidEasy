import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";
import "./singleDropdown.css";

export default function SingleCategoryDropdown({ selected, onChange, options = [] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const ref = useRef()

  const filtered = options.filter((opt) =>
    opt.name.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [])

  const handleSelect = (item) => {
    onChange(item.name) // now you store the string directly
    setIsOpen(false)
  }

  return (
    <div className="single-dropdown" ref={ref}>
      <div className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        {selected || "Select Category"}
        <ChevronDown className={`dropdown-arrow ${isOpen ? "open" : ""}`} size={16} />
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <input
            className="dropdown-search"
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="dropdown-options">
            {filtered.length > 0 ? (
              filtered.map((opt) => (
                <div
                  key={opt.name}
                  className={`dropdown-item ${selected === opt.name ? "selected" : ""}`}
                  onClick={() => handleSelect(opt)}
                >
                  {opt.name}
                </div>
              ))
            ) : (
              <div className="dropdown-item disabled">No matches found</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
