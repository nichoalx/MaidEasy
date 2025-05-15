// HomeOwner/HomeOwnerHistory.jsx
import { useState } from "react"
import { DateRange } from "react-date-range"
import { format } from "date-fns"
import searchIcon from "../assets/Search.png"
import calendarIcon from "../assets/calender_icon.png"

export default function HomeOwnerHistory() {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ])

  const [showPicker, setShowPicker] = useState(false)

  const formatRange = () => {
    const start = range[0].startDate
    const end = range[0].endDate
    const startMonth = format(start, "MMM")
    const endMonth = format(end, "MMM")
    const startDay = format(start, "d")
    const endDay = format(end, "d")

    return `${startMonth} ${startDay} → ${endMonth === startMonth ? endDay : `${endMonth} ${endDay}`}`
  }

  return (
    <div className="HomeOwnerHistory">
      <div className="HomeOwnerHistoryName">History</div>

      <div className="HomeOwnerHistoryBar">
        {/* Keywords + Type */}
        <div className="HomeOwnerSearchGroup">
          <div className="labelRow">
            <label>Keywords</label>
            <label>Type</label>
          </div>
          <div className="HomeOwnerSearchBar">
            <div className="searchGroup">
              <span className="searchIcon">
                <img src={searchIcon} alt="search icon" />
              </span>
              <input type="text" placeholder="Search By Service Name or Category" />
            </div>
            <div className="HomeOwnerBy">
              <select>
                <option>By Service</option>
                <option>By Category</option>
              </select>
            </div>
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="HomeOwnerSearchGroup">
          <div className="labelRow">
            <label>Date Period</label>
          </div>
          <div
            className="HomeOwnerSearchBar"
            onClick={() => setShowPicker(!showPicker)}
            style={{ cursor: "pointer" }}
          >
            <div className="searchGroup">
              <span className="searchIcon">
                <img src={calendarIcon} alt="calendar icon" />
              </span>
              <span>{formatRange()}</span>
            </div>
          </div>
        </div>

        {/* Showing dropdown */}
        <div className="HomeOwnerSearchGroup">
          <div className="labelRow">
            <label>Showing</label>
          </div>
          <div className="HomeOwnerSearchBar">
            <div className="HomeOwnerBy">
              <select>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Button */}
        <div className="HomeOwnerSearchGroup">
          <div className="labelRow" style={{ visibility: "hidden" }}>
            <label>Filter</label>
          </div>
          <button className="filterButtonHistory">Filter</button>
        </div>
      </div>

      {showPicker && (
        <div style={{ position: "absolute", zIndex: 10 }}>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={range}
          />
        </div>
      )}
    </div>
  )
}
