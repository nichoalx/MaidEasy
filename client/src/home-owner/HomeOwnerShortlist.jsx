import { useEffect, useState } from "react";
import searchIcon from "../assets/Search.png";
import HOCategoryDropdown from "./HOcategoryDropdown";
import ServiceCardGrid from "./ServiceCardGrid";
import ViewCleaningService from "./ViewCleaningService";
import axios from "../utils/axiosInstance";
import sample1 from "../assets/Sample1.png"
import nick from "../assets/nick.png"

export default function HomeOwnerShortlist() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [typeFilter, setTypeFilter] = useState("service");
  const [priceSort, setPriceSort] = useState("none");
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [visibleCount, setVisibleCount] = useState(18);
  const [selectedService, setSelectedService] = useState(null);

  // ✅ Fetch shortlisted services
  useEffect(() => {
    const fetchShortlisted = async () => {
      try {
        const res = await axios.get("/api/homeowner/search_shortlist");

        const serviceList = await Promise.all(res.data.filtered_shortlisted_services.map(async (s) => {
          let cleanerName = "Unknown";
          try {
            const userRes = await axios.get(`/api/users/${s.cleaner_id}`);
            if (userRes.data.success?.first_name) {
              cleanerName = userRes.data.success.first_name;
            }
          } catch {
            console.warn("Failed to fetch provider name");
          }

          return {
            id: s.service_id,
            serviceName: s.name,
            cleanerName,
            category: s.category_name,
            description: s.description || "-",
            price: s.price || 0,
            duration: s.duration || "-",
            availability: s.availability || "-",
            phone: s.contact_number || "-",
            joinedDate: s.joined_date || "2024",
            isFavorite: true,
            images: s.images || [],
            cleanerImage: s.cleaner_image || null
          };
        }));

        setServices(serviceList);
        setFiltered(serviceList);
      } catch (err) {
        console.error("Failed to load shortlist:", err);
      }
    };

    fetchShortlisted();
  }, []);

  // 🧼 Handle favorite toggle (remove from shortlist)
  const handleToggleFavorite = (id) => {
    const updated = services
      .map((s) => s.id === id ? { ...s, isFavorite: !s.isFavorite } : s)
      .filter((s) => s.isFavorite);

    setServices(updated);
    setFiltered(updated);

    if (selectedService?.id === id) {
      setSelectedService(null);
    }

    // 🔄 Send to backend
    axios.delete(`/api/homeowner/delete_from_shortlist/${id}`, {
      data: { service_id: id }
    }).catch(err => {
      console.error("Failed to remove from shortlist:", err);
    });
  };

  // 🔎 Filtering
  useEffect(() => {
    let result = [...services];

    if (searchTerm.trim()) {
      result = result.filter(
        (s) =>
          s.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.cleanerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter === "cleaner") {
      result = result.filter((s) =>
        s.cleanerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((s) => selectedCategories.includes(s.category));
    }

    if (priceSort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (priceSort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    setFiltered(result);
  }, [searchTerm, selectedCategories, typeFilter, priceSort, services]);

  const availableCategories = [...new Set(services.map((s) => s.category))].map((cat) => ({
    id: cat,
    name: cat
  }));

  return (
    <div className="HomeOwnerShortList">
      <div className="HomeOwnerShortListName">My Shortlist</div>

      {/* Filter Bar */}
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
            <HOCategoryDropdown
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

      {/* Result Count */}
      <div className="result-count">
        Showing {filtered.length} of {services.length} Results
      </div>

      <ServiceCardGrid
        services={filtered.slice(0, visibleCount)}
        onViewClick={setSelectedService}
        onToggleFavorite={handleToggleFavorite}
      />

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

      {selectedService && (
        <ViewCleaningService
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
}
