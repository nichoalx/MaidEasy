import { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

import "./HomeOwner.css";
// import photoIcon from "../assets/photo.png";
import logoutIcon from "../assets/logout.png";
import userIcon from "../assets/circle_person.png";
import searchIcon from "../assets/Search.png";
import calendarIcon from "../assets/calender_icon.png";

export default function HomeOwner() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [range, setRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
    ]);
    const [showPicker, setShowPicker] = useState(false);
    
    const formatRange = () => {
        const start = range[0].startDate;
        const end = range[0].endDate;
        const startMonth = format(start, "MMM");
        const endMonth = format(end, "MMM");
        const startDay = format(start, "d");
        const endDay = format(end, "d");
    
        return `${startMonth} ${startDay} → ${endMonth === startMonth ? endDay : `${endMonth} ${endDay}`}`;
    };

    return (
        <div className="HomeOwner">
            <div className="headerTitle">
                <div className="leftHODashboard">
                    <div className="headerLogo">
                        Garuda<br />Indonesia
                    </div>
                </div>
                <div className="middleHODashboard">
                    <div className="titleButton">
                        <button
                            className={activeTab === "dashboard" ? "activeTab" : ""}
                            onClick={() => setActiveTab("dashboard")}
                        >
                            Dashboard
                        </button>
                        <button
                            className={activeTab === "shortlist" ? "activeTab" : ""}
                            onClick={() => setActiveTab("shortlist")}
                        >
                            My Shortlist
                        </button>
                        <button
                            className={activeTab === "history" ? "activeTab" : ""}
                            onClick={() => setActiveTab("history")}
                        >
                            History
                        </button>
                    </div>
                </div>
                <div className="rightHODashboard">
                    <div className="userButton">
                        <button className="logoutButton">
                        <img src={logoutIcon} alt="logout icon" />
                        Log Out
                        </button>
                        <button className="profileButton">
                        <img src={userIcon} alt="user icon" />
                        <div className="homeownerInfo">
                            <p className="name">Cleaner 1</p>
                            <p className="email">cleaner1@main.com</p>
                        </div>
                        </button>
                    </div>
                </div>   
            </div>
            <div className="HomeOwnerPage">
                {activeTab === "dashboard" && (
                    <div className="HomeOwnerDashboard">
                        <div className="HomeOwnerDesc">
                            <div className="HomeOwnerWelcome">
                                Welcome to Garuda Indonesia
                            </div>
                            <div className="HomeOwnerDescription">
                                Your trusted place to find reliable, professional home cleaning -- anytime, anywhere. Discover top-rated cleaners, compare services,<br />and book with confidence. At Garuda Indonesia, we make spotless living effortless
                            </div>
                        </div>
                        <div className="HomeOwnerSearchContainer">
                            <div className="labelRow">
                                <label>Keywords</label>
                                <label>Type</label>
                                <label>Price</label>
                            </div>

                            <div className="HomeOwnerSearchBar">
                                <div className="searchGroup">
                                    <span className="searchIcon">
                                        <img src={searchIcon} alt="search icon" />
                                    </span>
                                    <input type="text" placeholder="Search By Services/Categories/Cleaners" />
                                    </div>

                                <div className="HomeOwnerBy">
                                    <select>
                                        <option>By Service </option>
                                        <option>By Category</option>
                                        <option>By Cleaners</option>
                                    </select>
                                </div>

                                <div className="HomeOwnerPrice">
                                    <select>
                                        <option>Price (Low to High)</option>
                                        <option>Price (High to Low)</option>
                                    </select>
                                </div>

                                <button className="filterButton">Filter</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "shortlist" && (
                    <div className="HomeOwnerShortList">
                        <div className="HomeOwnerShortListName">My Shortlist</div>
                        <div className="HomeOwnerSearchContainer">
                            <div className="labelRow">
                                <label>Keywords</label>
                                <label>Type</label>
                                <label>Price</label>
                            </div>

                            <div className="HomeOwnerSearchBar">
                                <div className="searchGroup">
                                    <span className="searchIcon">
                                        <img src={searchIcon} alt="search icon" />
                                    </span>
                                    <input type="text" placeholder="Search By Services/Categories/Cleaners" />
                                    </div>

                                <div className="HomeOwnerBy">
                                    <select>
                                        <option>By Service </option>
                                        <option>By Category</option>
                                        <option>By Cleaners</option>
                                    </select>
                                </div>

                                <div className="HomeOwnerPrice">
                                    <select>
                                        <option>Price (Low to High)</option>
                                        <option>Price (High to Low)</option>
                                    </select>
                                </div>

                                <button className="filterButton">Filter</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "history" && (
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


                    {/* Date Period */}
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

                    {/* Showing */}
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
                        <button className="filterButton">Filter</button>
                    </div>
                    </div>
                </div>
                )}
            </div>
        </div>    
    )
}