import React, { useEffect, useState } from "react";
import searchIcon from "../assets/Search.png";
import CategoryDropdown from "./HOcategoryDropdown";
import ServiceCardGrid from "./ServiceCardGrid";
import ViewCleaningService from "./ViewCleaningService";
import axios from "../utils/axiosInstance";

export default function HomeOwnerDashboard() {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [visibleCount, setVisibleCount] = useState(18);
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [typeFilter, setTypeFilter] = useState("service");
  const [priceSort, setPriceSort] = useState("none");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("/api/homeowner/search_services");
        const shortlistRes = await axios.get("/api/homeowner/search_shortlist");
        const shortlistedIds = shortlistRes.data?.filtered_shortlisted_services?.map(s => s.service_id) || [];

        const serviceList = await Promise.all(res.data.map(async (s) => {
          let cleanerName = "Unknown";
          try {
            const userRes = await axios.get(`/api/users/${s.cleaner_id}`);
            if (userRes.data.success?.first_name) {
              cleanerName = userRes.data.success.first_name;
            }
          } catch {
            console.warn("Could not fetch provider name");
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
            isFavorite: shortlistedIds.includes(s.service_id),
            images: s.images || [],
            cleanerImage: s.cleaner_image || null
          };
        }));

        setServices(serviceList);
        setFiltered(serviceList);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };

    fetchServices();
  }, []);

  const handleViewClick = async (service) => {
    if (!service?.id) return;
    try {
      await axios.get(`/api/homeowner/view_services/${service.id}`);
    } catch {
      console.warn("Failed to increment view count");
    }
    setSelectedService(service);
  };

  const handleToggleFavorite = async (serviceId) => {
    const isCurrentlyFavorite = services.find(s => s.id === serviceId)?.isFavorite;
  
    try {
      if (isCurrentlyFavorite) {
        await axios.delete(`/api/homeowner/delete_from_shortlist/${serviceId}`, {
          data: { service_id: serviceId }
        });
      } else {
        // ✅ POST with JSON body (axiosInstance already includes correct Content-Type)
        await axios.post(`/api/homeowner/add_to_shortlist`, {
          service_id: serviceId
        });
      }
  
      // Update UI after toggle
      const updated = services.map(s =>
        s.id === serviceId ? { ...s, isFavorite: !s.isFavorite } : s
      );
      setServices(updated);
      setFiltered(updated);
    } catch (err) {
      console.error("Failed to update shortlist status:", err);
    }
  };

  const availableCategories = [
    ...new Set(services.map(s => s.category).filter(Boolean))
  ].map(name => ({ id: name, name }));

  useEffect(() => {
    let result = [...services];

    if (searchTerm.trim()) {
      result = result.filter(s =>
        s.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.cleanerName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter === "cleaner") {
      result = result.filter(s =>
        s.cleanerName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter(s => selectedCategories.includes(s.category));
    }

    if (priceSort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (priceSort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    setFiltered(result);
  }, [searchTerm, selectedCategories, typeFilter, priceSort, services]);

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

      <div className="result-count">
        Showing {filtered.length} of {services.length} Results
      </div>

      <ServiceCardGrid
        services={filtered.slice(0, visibleCount)}
        onViewClick={handleViewClick}
        onToggleFavorite={handleToggleFavorite}
      />

      {visibleCount < filtered.length && (
        <div className="load-more-container">
          <button onClick={() => setVisibleCount(prev => prev + 18)} className="load-more-button">
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
