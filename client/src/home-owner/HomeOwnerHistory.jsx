import { useEffect, useMemo, useState } from "react"
import { DateRange } from "react-date-range"
import { format } from "date-fns"
import searchIcon from "../assets/Search.png"
import calendarIcon from "../assets/calender_icon.png"
import closeIcon from "../assets/close.png"
import HOCategoryDropdown from "./HOcategoryDropdown"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import BookingDetailModal from "./ViewBookingDetail"
import sample1 from "../assets/Sample1.png"
import nick from "../assets/nick.png"
import axios from "../utils/axiosInstance";

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
  const [selectedBooking, setSelectedBooking] = useState(null)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchPastBookings = async () => {
      try {
        const res = await axios.get("/api/homeowner/view_past_bookings", {
          withCredentials: true,
        });
        console.log("Raw response:", res.data);  // Check if it's [] or an error message
        const bookings = res.data;
  
        const transformed = await Promise.all(
          bookings.map(async (b) => {
            let phone = "-";
  
            try {
              const userRes = await axios.get(`/api/users/${b.cleaner_user_id}`);
              if (userRes.data.success?.contact_number) {
                phone = userRes.data.success.contact_number;
              }
            } catch (err) {
              console.warn(`Could not fetch phone for cleaner ${b.cleaner_user_id}`, err);
            }
  
            return {
              id: b.booking_id || b.id,
              serviceName: b.service_name || "Unnamed Service",
              category: b.service_category || "Uncategorized",
              cleanerName: b.cleaner_name || "Unknown Cleaner",
              phone,
              price: b.price || 0,
              date: b.booking_date ? new Date(b.booking_date) : new Date(),
            };
          })
        );
  
        setServices(transformed);
        console.log("Transformed bookings:", transformed)
        setFiltered(transformed);
      } catch (err) {
        console.error("Failed to fetch past bookings:", err);
      }
    };
  
    fetchPastBookings();
  }, []);

  useEffect(() => {
    let result = [...services]

    // Search filter
    if (searchTerm.trim()) {
      result = result.filter(
        (s) =>
          s.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.cleanerName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (typeFilter === "cleaner") {
      result = result.filter((s) =>
        s.cleanerName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      console.log("Filtering by categories:", selectedCategories)
      console.log("First service category:", result[0]?.category)

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
        <div className="labelRow2">
          <label5>Keywords</label5>
          <label5>Type</label5>
          <label5>Category</label5>
          <label5>Price</label5>
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
            <HOCategoryDropdown
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
      <div className="result-count8">
        Showing {filtered.length} of {services.length} Results
      </div>

      {/* 📋 Table View */}
      <div className="categories-table-container99">
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
                <td><b>{item.serviceName}</b></td>
                <td>{item.category}</td>
                <td>{item.cleanerName}</td>
                <td>$ {item.price.toLocaleString()}</td>
                <td>{format(new Date(item.date), "MMM d, yyyy")}</td>
                <td>
                <button className="view-btn" onClick={() => setSelectedBooking(item)}>
                  View
                </button>
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
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  )
}