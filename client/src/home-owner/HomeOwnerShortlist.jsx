import { useEffect, useState } from "react"
import searchIcon from "../assets/Search.png"
import CategoryDropdown from "./categoryDropdown"
import ServiceCardGrid from "./ServiceCardGrid"
import ViewCleaningService from "./ViewCleaningService"

import sample1 from "../assets/Sample1.png"
import sample2 from "../assets/Sample2.png"
import sample3 from "../assets/Sample3.png"
import nick from "../assets/nick.png"

export default function HomeOwnerShortlist() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [typeFilter, setTypeFilter] = useState("service")
  const [priceSort, setPriceSort] = useState("none")
  const [services, setServices] = useState([])
  const [filtered, setFiltered] = useState([])
  const [visibleCount, setVisibleCount] = useState(18)
  const [selectedService, setSelectedService] = useState(null)

  // 💔 Toggle and remove if unfavorited
  const handleToggleFavorite = (id) => {
    const updated = services
      .map((s) => s.id === id ? { ...s, isFavorite: !s.isFavorite } : s)
      .filter((s) => s.isFavorite)
  
    setServices(updated)
    setFiltered(updated)
  
    // 🧼 If the currently viewed item is removed, close the modal
    if (selectedService?.id === id) {
      setSelectedService(null)
    }
  }

  // 🧪 Dummy favorited-only services
  useEffect(() => {
    const dummy = Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      serviceName: `Service ${i + 1}`,
      category: ["Floor", "Glass", "Furniture", "Living Room"][i % 4],
      price: 60000 + i * 1000,
      providerName: `Cleaner ${i + 1}`,
      joinedDate: `Jan ${2022 + (i % 3)}`,
      isFavorite: true,
      description: `This is a professional ${["floor", "glass", "furniture", "carpet"][i % 4]} cleaning service that ensures high-quality results using eco-friendly materials. Perfect for maintaining a spotless and healthy home environment.`,
      duration: `${1 + (i % 3)} hour(s)`,
      availability: ["Monday–Friday", "Weekends", "Daily", "Custom"][i % 4],
      phone: `+62 812 3456 78${String(i).padStart(2, "0")}`,
      images: [sample1, sample2, sample3],
      providerImage: nick
    }))
    setServices(dummy)
    setFiltered(dummy)
  }, [])

  // 🔎 Filter Logic
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

      {/* 🔍 Filter Bar */}
      <div className="HomeOwnerSearchContainer">
        <div className="labelRow">
          <label>Keywords</label>
          <label>Type</label>
          <label>Category</label>
          <label>Price</label>
        </div>

        <div className="HomeOwnerSearchBar">
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

          <div className="HomeOwnerBy">
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="service">By Service</option>
              <option value="cleaner">By Cleaners</option>
            </select>
          </div>

          <div className="HomeOwnerCategoryDropdown">
            <CategoryDropdown
              selectedCategories={selectedCategories}
              onChange={setSelectedCategories}
              availableCategories={availableCategories}
            />
          </div>

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
      <ServiceCardGrid
        services={filtered.slice(0, visibleCount)}
        onViewClick={setSelectedService}
        onToggleFavorite={handleToggleFavorite}
      />

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

      {/* 🔍 View Modal */}
      {selectedService && (
        <ViewCleaningService
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  )
}
