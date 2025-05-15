// HomeOwner/HomeOwnerShortlist.jsx
import searchIcon from "../assets/Search.png"

export default function HomeOwnerShortlist() {
  return (
    <div className="HomeOwnerShortList">
      <div className="HomeOwnerShortListName">My Shortlist</div>

      <div className="HomeOwnerSearchContainer">
        <div className="labelRow">
          <label>Keywords</label>
          <label>Type</label>
          <label>Price</label>
        </div>

        <div className="HomeOwnerSearchBar">
          {/* Search input */}
          <div className="searchGroup">
            <span className="searchIcon">
              <img src={searchIcon} alt="search icon" />
            </span>
            <input type="text" placeholder="Search By Services/Categories/Cleaners" />
          </div>

          {/* Type dropdown */}
          <div className="HomeOwnerBy">
            <select>
              <option>By Service</option>
              <option>By Category</option>
              <option>By Cleaners</option>
            </select>
          </div>

          {/* Price dropdown */}
          <div className="HomeOwnerPrice">
            <select>
              <option>Price (Low to High)</option>
              <option>Price (High to Low)</option>
            </select>
          </div>

          {/* Filter button */}
          <button className="filterButton">Filter</button>
        </div>
      </div>
    </div>
  )
}
