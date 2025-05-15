import { useEffect, useState } from "react"
import searchIcon from "../assets/Search.png"
import calendarIcon from "../assets/calender_icon.png"
import CategoryDropdown from "../components/categoryDropdown"
import ServiceCardGrid from "./ServiceCardGrid"

export default function HomeOwnerDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [typeFilter, setTypeFilter] = useState("service")
  const [priceSort, setPriceSort] = useState("none")
  const [services, setServices] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    const dummy = [
      {
        serviceName: "Window Cleaning",
        category: "Glass",
        price: 85000,
        providerName: "Dwi Hartanto",
        joinedDate: "Jan 2023",
        isFavorite: true
      },
      {
        serviceName: "Floor Cleaning",
        category: "Floor",
        price: 65000,
        providerName: "Siti Rahma",
        joinedDate: "Mar 2022"
      },
      {
        serviceName: "Carpet Cleaning",
        category: "Living Room",
        price: 90000,
        providerName: "Agus Santoso",
        joinedDate: "May 2021"
      },
      {
        serviceName: "Sofa Cleaning",
        category: "Furniture",
        price: 80000,
        providerName: "Tini Handayani",
        joinedDate: "Aug 2022"
      }
    ]

    setServices(dummy)
    setFiltered(dummy)
  }, [])

  // 🔁 Filter & sort logic
  useEffect(() => {
    let result = [...services]

    // 🔍 Keyword search
    if (searchTerm.trim()) {
      result = result.filter(
        (s) =>
          s.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.providerName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 🧪 Type filter
    if (typeFilter === "service") {
      // nothing to change
    } else if (typeFilter === "cleaner") {
      result = result.filter((s) =>
        s.providerName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 📁 Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((s) => selectedCategories.includes(s.category))
    }

    // 💰 Price sort
    if (priceSort === "low") {
      result.sort((a, b) => a.price - b.price)
    } else if (priceSort === "high") {
      result.sort((a, b) => b.price - a.price)
    }

    setFiltered(result)
  }, [searchTerm, selectedCategories, typeFilter, priceSort, services])

  // 📦 Extract unique categories
  const availableCategories = [...new Set(services.map((s) => s.category))].map((cat) => ({
    id: cat,
    name: cat
  }))

  return (
    <div className="HomeOwnerDashboard">
      <div className="HomeOwnerDesc">
        <div className="HomeOwnerWelcome">Welcome to Garuda Indonesia</div>
        <div className="HomeOwnerDescription">
          Your trusted place to find reliable, professional home cleaning — anytime, anywhere.
          Discover top-rated cleaners, compare services,<br />
          and book with confidence. At Garuda Indonesia, we make spotless living effortless.
        </div>
      </div>

      {/* 🔍 Search Filter Bar */}
      <div className="HomeOwnerSearchContainer">
        <div className="labelRow">
          <label>Keywords</label>
          <label>Type</label>
          <label>Category</label>
          <label>Price</label>
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

          {/* Price */}
          <div className="HomeOwnerPrice">
            <select value={priceSort} onChange={(e) => setPriceSort(e.target.value)}>
              <option value="none">Sort Price</option>
              <option value="low">Price (Low to High)</option>
              <option value="high">Price (High to Low)</option>
            </select>
          </div>

          <button className="filterButton">Filter</button>
        </div>
      </div>

      {/* 📊 Result Count */}
      <div className="result-count">
        Showing {filtered.length} of {services.length} Results
      </div>

      {/* 🧱 Service Cards */}
      <ServiceCardGrid services={filtered} />
    </div>
  )
}
