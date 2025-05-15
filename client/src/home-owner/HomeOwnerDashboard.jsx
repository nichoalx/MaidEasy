// HomeOwner/HomeOwnerDashboard.jsx
import searchIcon from "../assets/Search.png"

export default function HomeOwnerDashboard() {
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
          <label>Price</label>
        </div>

        <div className="HomeOwnerSearchBar">
          {/* Keywords */}
          <div className="searchGroup">
            <span className="searchIcon">
              <img src={searchIcon} alt="search icon" />
            </span>
            <input type="text" placeholder="Search By Services/Categories/Cleaners" />
          </div>

          {/* Type */}
          <div className="HomeOwnerBy">
            <select>
              <option>By Service</option>
              <option>By Category</option>
              <option>By Cleaners</option>
            </select>
          </div>

          {/* Price */}
          <div className="HomeOwnerPrice">
            <select>
              <option>Price (Low to High)</option>
              <option>Price (High to Low)</option>
            </select>
          </div>

          {/* Filter */}
          <button className="filterButton">Filter</button>
        </div>
      </div>
    </div>
  )
}
