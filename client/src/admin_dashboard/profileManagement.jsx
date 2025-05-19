import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./components/Pagination";
import ShowingDropdown from "./components/ShowingDropdown";
import Toast from "./components/Toast";
import SuspendProfileModal from "./SuspendProfileModal";
import axios from "../utils/axiosInstance";

function ProfileManagement() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [suspendModal, setSuspendModal] = useState({ show: false, role: null });

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
    const results = roles.filter((role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRoles(results);
    setCurrentPage(1);
  }, [searchTerm, roles]);

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
    <main className="profile-management-content">
      <h1 className="profile-management-title">User Profile Management</h1>

      <div className="profile-management-controls">
        <div className="search-container">
          <div className="search-header">
            <label>Keyword</label>
            <div className="search-by-container">
              <label className="search-by-label">Search By</label>
              <div className="search-by-dropdown">
                <div className="search-by-selected">Role</div>
              </div>
            </div>
          </div>
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search by role name"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="results-info">
            Showing {indexOfFirstRole + 1} to {Math.min(indexOfLastRole, filteredRoles.length)} of {filteredRoles.length} results
          </div>
        </div>

        <div className="profile-management-actions">
          <ShowingDropdown value={itemsPerPage} onChange={setItemsPerPage} options={[5, 10, 15, 20]} />
          <button className="add-profile-button" onClick={handleAddProfile}>
            <span>+</span> Add New Profile
          </button>
        </div>
      </div>

      <div className="profile-management-table-container">
        <table className="profile-management-table">
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
                      <button className="view-button" onClick={() => handleView(role.id)}>View</button>
                      <button className="edit-button" onClick={() => handleEdit(role.id)}>Edit</button>
                      <button
                        className={role.status === "Active" ? "suspend-button" : "edit-button"}
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
    </main>
  );
}

export default ProfileManagement;
