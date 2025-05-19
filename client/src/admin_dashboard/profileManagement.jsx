import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./components/Pagination";
import ShowingDropdown from "./components/ShowingDropdown";
import Toast from "./components/Toast";
import SuspendProfileModal from "./SuspendProfileModal";
import axios from "../utils/axiosInstance";
import categoryIcon from "../assets/category.png";
import personIcon from "../assets/circle_person.png";
import reportIcon from "../assets/report.png";
import logoutIcon from "../assets/logout.png";
import searchIcon from "../assets/Search.png";
import arrowIcon from "../assets/arrow.png";

function ProfileManagement() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [suspendModal, setSuspendModal] = useState({ show: false, role: null });
  const [inputTerm, setInputTerm] = useState(""); 


  useEffect(() => {
    const fetchRolesWithUserCounts = async () => {
      try {
        const [profilesRes, usersRes] = await Promise.all([
          axios.get("/api/profiles"),
          axios.get("/api/users"),
        ]);

        const users = usersRes.data.success;

        const formatted = profilesRes.data.success.map((role) => {
          const count = users.filter(
            (u) => u.profile_name.toLowerCase() === role.role_name.toLowerCase()
          ).length;

          return {
            id: role.profile_id,
            name: role.role_name,
            users: count,
            status: role.is_active ? "Active" : "Inactive",
            description: role.description || "-",
            permissions: [
            ...(role.has_booking_permission ? ["Booking"] : []),
            ...(role.has_listing_permission ? ["Listing"] : []),
            ...(role.has_view_analytics_permission ? ["Analytics"] : []),
          ]
       };
        });

        setRoles(formatted);
      } catch (error) {
        console.error("Error fetching profiles/users:", error);
      }
    };

    fetchRolesWithUserCounts();
  }, []);

  useEffect(() => {
    let results = [...roles];

    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      results = results.filter((role) => role.name.toLowerCase().includes(lower));
    }

    setFilteredRoles(results);
    setCurrentPage(1);
  }, [roles, searchTerm]);

  const indexOfLastRole = currentPage * itemsPerPage;
  const indexOfFirstRole = indexOfLastRole - itemsPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);

  const handleView = (profileId) => navigate(`/view-profile/${profileId}`);
  const handleEdit = (profileId) => navigate(`/edit-profile/${profileId}`);
  const handleAddProfile = () => navigate("/add-profile");

  const handleSuspend = (roleId) => {
    const role = roles.find((r) => r.id === roleId);
    setSuspendModal({ show: true, role });
  };

  const confirmSuspend = async () => {
    if (!suspendModal.role) return;

    const { id, status } = suspendModal.role;
    const isCurrentlyActive = status === "Active";

    try {
      const endpoint = isCurrentlyActive
        ? `/api/profiles/suspend/${id}`
        : `/api/profiles/activate/${id}`;

      await axios.put(endpoint);

      const updatedRoles = roles.map((role) =>
        role.id === id
          ? { ...role, status: isCurrentlyActive ? "Inactive" : "Active" }
          : role
      );

      setRoles(updatedRoles);

      setToast({
        show: true,
        message: `Role has been ${isCurrentlyActive ? "deactivated" : "activated"}`,
        type: "success",
      });
    } catch (error) {
      console.error("Failed to toggle profile status:", error);
      setToast({ show: true, message: "Failed to update role status", type: "error" });
    }

    setSuspendModal({ show: false, role: null });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setToast({ show: true, message: "No more data to display", type: "info" });
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    }
  };

  return (
    <div className="whiteSpace">
      <div className="platform-content">
        <div className="platform-title-bar">
          <h1 className="platform-title">User Profile Management</h1>
          <button className="add-button" onClick={handleAddProfile}>+ Add New Profile</button>
        </div>

          <div className="platform-controls">
            <div className="search-section">
              <div className="keyword-section">
                <label>Keyword</label>
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    placeholder="Enter Role Name"
                    className="search-input"
                    value={inputTerm}
                    onChange={(e) => setInputTerm(e.target.value)}
                  />
                  <i className="search-icon"><img src={searchIcon} alt="search icon" /></i>
                </div>
              </div>
              <button className="searchButton" onClick={() => setSearchTerm(inputTerm)}>
                Search
              </button>
            </div>
            <div className="results-info">Showing {filteredRoles.length} Results</div>
          </div>

          <div className="categories-table-container13">
            <table className="categories-table13">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Role Name</th>
                  <th>No. Users</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRoles.length > 0 ? (
                  currentRoles.map((role, index) => (
                    <tr key={role.id}>
                      <td>{indexOfFirstRole + index + 1}</td>
                      <td>{role.name}</td>
                      <td>{role.users}</td>
                      <td><span className={`status-badge ${role.status.toLowerCase()}`}>{role.status}</span></td>
                      <td>
                        <div className="action-buttons">
                          <button className="view-btn" onClick={() => handleView(role.id)}>View</button>
                          <button className="edit-btn" onClick={() => handleEdit(role.id)}>Edit</button>
                          <button
                            className={role.status === "Active" ? "suspend-button" : "activate-button"}
                            onClick={() => handleSuspend(role.id)}>
                            {role.status === "Active" ? "Suspend" : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>No roles found</td>
                  </tr>
                )}
              </tbody>
            </table>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNextPage={handleNextPage}
              onPrevPage={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            />
          </div>

          {suspendModal.show && (
            <SuspendProfileModal
              role={suspendModal.role}
              onClose={() => setSuspendModal({ show: false, role: null })}
              onConfirm={confirmSuspend}
            />
          )}

          {toast.show && <Toast message={toast.message} type={toast.type} />}

      </div>
    </div>  
  );
}

export default ProfileManagement;
