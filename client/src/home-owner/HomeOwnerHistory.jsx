import { useState } from "react"
import { DateRange } from "react-date-range"
import { format } from "date-fns"
import searchIcon from "../assets/Search.png"
import CategoryDropdown from "../components/categoryDropdown"
import calendarIcon from "../assets/calender_icon.png"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

export default function HomeOwnerShortlist() {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [showPicker, setShowPicker] = useState(false)
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ])

  const formatRange = () => {
    const start = range[0].startDate
    const end = range[0].endDate
    return `${format(start, "MMM d, yyyy")} → ${format(end, "MMM d, yyyy")}`
  }

  return (
    <div className="HomeOwnerHistory">
      <div className="HomeOwnerHistoryName">History</div>

      <div className="HomeOwnerSearchContainer">
        <div className="labelRow">
          <label>Keywords</label>
          <label>Type</label>
          <label>Category</label>
          <label>Date</label>
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

          {/* Date Range Picker */}
          <div className="HomeOwnerDateFilter" style={{ position: "relative" }}>
            <div
              className="searchGroup"
              onClick={() => setShowPicker(!showPicker)}
              style={{ cursor: "pointer" }}
            >
              <span className="searchIcon">
                <img src={calendarIcon} alt="calendar icon" />
              </span>
              <span className="dateOutput">{formatRange()}</span>
            </div>

            {showPicker && (
              <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 999 }}>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setRange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                />
              </div>
            )}
          </div>

          {/* Filter button */}
          <button className="filterButton">Filter</button>
        </div>
      </div>
    </div>
  )
}
