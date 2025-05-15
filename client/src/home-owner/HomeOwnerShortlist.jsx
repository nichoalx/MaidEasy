// HomeOwner/HomeOwnerShortlist.jsx
import { useState } from "react"
import searchIcon from "../assets/Search.png"
import CategoryDropdown from "../components/categoryDropdown"

export default function HomeOwnerShortlist() {
    const [selectedCategories, setSelectedCategories] = useState([])


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
                <input type="text" placeholder="Search By Services or Cleaners" />
            </div>

            {/* Type dropdown */}
            <div className="HomeOwnerBy">
                <select>
                <option>By Service</option>
                <option>By Cleaners</option>
                </select>
            </div>

            {/* Category */}
                <div className="HomeOwnerCategoryDropdown">
                    <CategoryDropdown
                    selectedCategories={selectedCategories}
                    onChange={setSelectedCategories}
                    availableCategories={[
                        { id: "window", name: "Window Cleaning" },
                        { id: "floor", name: "Floor Cleaning" },
                        { id: "sofa", name: "Sofa Cleaning" },
                        { id: "carpet", name: "Carpet Cleaning" },
                        { id: "bathroom", name: "Bathroom Cleaning" },
                    ]}
                    />
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
