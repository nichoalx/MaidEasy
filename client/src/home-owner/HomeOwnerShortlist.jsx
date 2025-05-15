// HomeOwner/HomeOwnerShortlist.jsx
import { useEffect, useState } from "react"
import searchIcon from "../assets/Search.png"
import CategoryDropdown from "./categoryDropdown"
import ServiceCardGrid from "./ServiceCardGrid"

export default function HomeOwnerShortlist() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [typeFilter, setTypeFilter] = useState("service")
  const [priceSort, setPriceSort] = useState("none")
  const [services, setServices] = useState([])
  const [filtered, setFiltered] = useState([])
  const [visibleCount, setVisibleCount] = useState(18)

  useEffect(() => {
    const dummy = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      serviceName: `Shortlisted ${i + 1}`,
      category: ["Floor", "Glass", "Furniture", "Living Room"][i % 4],
      price: 70000 + i * 500,
      providerName: `Fav Cleaner ${i + 1}`,
      joinedDate: `Feb ${2022 + (i % 3)}`,
      isFavorite: true
    }))

    setServices(dummy)
    setFiltered(dummy)
  }, [])

  useEffect(() => {
    let result = [...services]

    if (searchTerm.trim()) {
      result = result.filter(
        (s) =>
          s.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.providerName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (typeFilter === "cleaner") {
      result = result.filter((s) =>
        s.providerName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategories.length > 0) {
      result = result.filter((s) => selectedCategories.includes(s.category))
    }

    if (priceSort === "low") {
      result.sort((a, b) => a.price - b.price)
    } else if (priceSort === "high") {
      result.sort((a, b) => b.price - a.price)
    }

    setFiltered(result)
  }, [searchTerm, selectedCategories, typeFilter, priceSort, services])

  const availableCategories = [...new Set(services.map((s) => s.category))].map((cat) => ({
    id: cat,
    name: cat
  }))

  return (
    <div className="HomeOwnerShortList">
      <div className="HomeOwnerShortListName">My Shortlist</div>

      <div className="HomeOwnerSearchContainer">
        <div className="labelRow">
          <label>Keywords</label>
          <label>Type</label>
          <label>Category</label>
          <label>Price</label>
        </div>

        <div className="HomeOwnerSearchBar">
          {/* Search input */}
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

          {/* Type dropdown */}
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

          {/* Price dropdown */}
          <div className="HomeOwnerPrice">
            <select value={priceSort} onChange={(e) => setPriceSort(e.target.value)}>
              <option value="none">Sort Price</option>
              <option value="low">Price (Low to High)</option>
              <option value="high">Price (High to Low)</option>
            </select>
          </div>

          {/* Filter button (optional interaction trigger) */}
          <button className="filterButton">Filter</button>
        </div>
      </div>

      {/* 📊 Result Count */}
      <div className="result-count">
        Showing {filtered.length} of {services.length} Results
      </div>

      {/* 🧱 Service Cards */}
      <ServiceCardGrid services={filtered.slice(0, visibleCount)} />

      {/* Load More */}
      {visibleCount < filtered.length && (
        <div className="load-more-container">
          <button
            onClick={() => setVisibleCount((prev) => prev + 18)}
            className="load-more-button"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
