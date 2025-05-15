import { useEffect, useMemo, useState } from "react"
import { DateRange } from "react-date-range"
import { format } from "date-fns"
import searchIcon from "../assets/Search.png"
import calendarIcon from "../assets/calender_icon.png"
import closeIcon from "../assets/close.png"
import CategoryDropdown from "./categoryDropdown"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

export default function HomeOwnerHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("service")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [range, setRange] = useState(null)
  const [showPicker, setShowPicker] = useState(false)
  const [services, setServices] = useState([])
  const [filtered, setFiltered] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortAsc, setSortAsc] = useState(true)
  const itemsPerPage = 10

  useEffect(() => {
    const dummy = Array.from({ length: 42 }, (_, i) => ({
      id: i + 1,
      name: `Service ${i + 1}`,
      category: ["Floor", "Glass", "Furniture", "Living Room"][i % 4],
      provider: `Cleaner ${i + 1}`,
      price: 70000 + i * 500,
      date: new Date(2024, i % 12, (i % 28) + 1)
    }))
    setServices(dummy)
    setFiltered(dummy)
  }, [])

  useEffect(() => {
    let result = [...services]

    // Search filter
    if (searchTerm.trim()) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.provider.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (typeFilter === "cleaner") {
      result = result.filter((s) =>
        s.provider.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((s) => selectedCategories.includes(s.category))
    }

    // Date range filter
    if (range && range[0].startDate && range[0].endDate) {
      const start = range[0].startDate
      const end = range[0].endDate
      result = result.filter((s) => {
        const d = new Date(s.date)
        return d >= start && d <= end
      })
    }

    setFiltered(result)
    setCurrentPage(1)
  }, [searchTerm, typeFilter, selectedCategories, range, services])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage)

  const toggleSort = () => {
    const sorted = [...filtered].sort((a, b) =>
      sortAsc ? a.date - b.date : b.date - a.date
    )
    setFiltered(sorted)
    setSortAsc(!sortAsc)
  }

  const formatRange = () => {
    if (!range) return "Any Date"
    const start = range[0].startDate
    const end = range[0].endDate
    return `${format(start, "MMM d, yyyy")} → ${format(end, "MMM d, yyyy")}`
  }

  const availableCategories = useMemo(() => {
    const seen = new Set()
    return services.reduce((acc, s) => {
      if (!seen.has(s.category)) {
        seen.add(s.category)
        acc.push({ id: s.category, name: s.category })
      }
      return acc
    }, [])
  }, [services])

  return (
    <div className="HomeOwnerHistory">
      <div className="HomeOwnerHistoryName">History</div>

      {/* 🔍 Search & Filters */}
      <div className="HomeOwnerSearchContainer">
        <div className="labelRow">
          <label>Keywords</label>
          <label>Type</label>
          <label>Category</label>
          <label>Date</label>
        </div>

        <div className="HomeOwnerSearchBar">
          {/* Keywords */}
          <div className="searchGroup">
            <span className="searchIcon">
              <img src={searchIcon} alt="search icon" />
            </span>
            <input
              type="text"
              placeholder="Search By Services or Cleaners"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Type */}
          <div className="HomeOwnerBy">
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="service">By Service</option>
              <option value="cleaner">By Cleaners</option>
            </select>
          </div>

          {/* Category */}
          <div className="HomeOwnerCategoryDropdown">
            <CategoryDropdown
              selectedCategories={selectedCategories}
              onChange={setSelectedCategories}
              availableCategories={availableCategories}
            />
          </div>

          {/* Date */}
          <div className="HomeOwnerDateFilter" style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <div
              className="searchGroup"
              onClick={() => setShowPicker(!showPicker)}
              style={{ cursor: "pointer" }}
            >
              <span className="searchIcon">
                <img src={calendarIcon} alt="calendar icon" />
              </span>
              <span className="calendarText">{formatRange()}</span>
            </div>

            {/* ✅ Clear Date Icon Button */}
            {range && (
              <button
                className="clear-date-btn"
                onClick={() => setRange(null)}
                style={{
                  marginLeft: "8px",
                  padding: 0,            // keep it tight around the icon
                  background: "none",
                  border: "none",
                  cursor: "pointer"
                }}
                aria-label="Clear date range"
              >
                <img src={closeIcon} alt="Clear" style={{ width: 20, height: 20 }} />
              </button>
            )}

            {showPicker && (
              <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 999 }}>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setRange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={range || [{ startDate: new Date(), endDate: new Date(), key: "selection" }]}
                />
              </div>
            )}
          </div>

          <button className="filterButton">Filter</button>
        </div>
      </div>

      {/* 📊 Result Count */}
      <div className="result-count">
        Showing {filtered.length} of {services.length} Results
      </div>

      {/* 📋 Table View */}
      <div className="categories-table-container">
        <table className="categories-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Service Name</th>
              <th>Category</th>
              <th>Cleaners</th>
              <th>Price</th>
              <th onClick={toggleSort} style={{ cursor: "pointer" }}>
                Date {sortAsc ? "▲" : "▼"}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td><b>{item.name}</b></td>
                <td>{item.category}</td>
                <td>{item.provider}</td>
                <td>Rp {item.price.toLocaleString()}</td>
                <td>{format(new Date(item.date), "MMM d, yyyy")}</td>
                <td>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="paginationBar">
          <div className="paginationSection left">
            {currentPage > 1 && (
              <button className="prev-btn" onClick={() => setCurrentPage((prev) => prev - 1)}>&lt; Previous</button>
            )}
          </div>
          <div className="paginationSection center">
            <span className="page-info">Page {currentPage} of {totalPages}</span>
          </div>
          <div className="paginationSection right">
            {currentPage < totalPages && (
              <button className="next-btn" onClick={() => setCurrentPage((prev) => prev + 1)}>Next &gt;</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
