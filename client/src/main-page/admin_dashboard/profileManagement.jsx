import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Pagination from "./components/Pagination"
import ShowingDropdown from "./components/ShowingDropdown"
import Toast from "./components/Toast"

function ProfileManagement() {
  const navigate = useNavigate()
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      users: 2,
      status: "Active",
      description: "System administrators with full access to all features",
      permissions: ["User Management", "Profile Management", "System Settings", "Reports"],
    },
    {
      id: 2,
      name: "Cleaner",
      users: 20,
      status: "Active",
      description: "Professional cleaners who provide cleaning services",
      permissions: ["Service Management", "Schedule Management", "Client Communication"],
    },
    {
      id: 3,
      name: "Home Owner",
      users: 68,
      status: "Active",
      description: "Customers who book cleaning services for their homes",
      permissions: ["Service Booking", "Payment Management", "Reviews"],
    },
    {
      id: 4,
      name: "Baby Sitter",
      users: 13,
      status: "Inactive",
      description: "Professionals who provide baby sitting services",
      permissions: ["Schedule Management", "Client Communication"],
    },
    {
      id: 5,
      name: "Project Manager",
      users: 8,
      status: "Active",
      description: "Managers who oversee cleaning projects and teams",
      permissions: ["Team Management", "Project Planning", "Client Communication", "Reports"],
    },
    {
      id: 6,
      name: "Customer Support",
      users: 5,
      status: "Active",
      description: "Staff who handle customer inquiries and issues",
      permissions: ["Ticket Management", "Client Communication", "Knowledge Base"],
    },
    {
      id: 7,
      name: "Accountant",
      users: 3,
      status: "Active",
      description: "Financial staff who manage billing and payments",
      permissions: ["Financial Reports", "Invoice Management", "Payment Processing"],
    },
  ])

  // State for search, pagination, and modals
  const [searchByOpen, setSearchByOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredRoles, setFilteredRoles] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [toast, setToast] = useState({ show: false, message: "", type: "" })

  // Filter roles based on search term
  useEffect(() => {
    const results = roles.filter((role) => role.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredRoles(results)
    setCurrentPage(1) // Reset to first page when search changes
  }, [searchTerm, roles])

  // Get current roles for pagination
  const indexOfLastRole = currentPage * itemsPerPage
  const indexOfFirstRole = indexOfLastRole - itemsPerPage
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole)
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage)

  // Handle view role
  const handleView = (profileId) => {
    navigate(`/view-profile/${profileId}`)
  }

  // Handle edit role
  const handleEdit = (profileId) => {
    navigate(`/edit-profile/${profileId}`)
  }

  // Handle add new profile
  const handleAddProfile = () => {
    navigate("/add-profile")
  }

  // Handle suspend role
  const handleSuspend = (roleId) => {
    setRoles(
      roles.map((role) =>
        role.id === roleId ? { ...role, status: role.status === "Active" ? "Inactive" : "Active" } : role,
      ),
    )

    // Show toast notification
    setToast({
      show: true,
      message: `Role has been ${roles.find((r) => r.id === roleId).status === "Active" ? "deactivated" : "activated"}`,
      type: "success",
    })

    // Hide toast after 3 seconds
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" })
    }, 3000)
  }

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    } else {
      // Show toast notification for no more data
      setToast({
        show: true,
        message: "No more data to display",
        type: "info",
      })

      // Hide toast after 3 seconds
      setTimeout(() => {
        setToast({ show: false, message: "", type: "" })
      }, 3000)
    }
  }

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
                <div className="search-by-selected" onClick={() => setSearchByOpen(!searchByOpen)}>
                  Role <span className="dropdown-arrow">▼</span>
                </div>
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
            Showing {indexOfFirstRole + 1} to {Math.min(indexOfLastRole, filteredRoles.length)} of{" "}
            {filteredRoles.length} results
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
                  <td>
                    <span className={`status-badge ${role.status.toLowerCase()}`}>{role.status}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="view-button" onClick={() => handleView(role.id)}>
                        View
                      </button>
                      <button className="edit-button" onClick={() => handleEdit(role.id)}>
                        Edit
                      </button>
                      <button
                        className={role.status === "Active" ? "suspend-button" : "edit-button"}
                        onClick={() => handleSuspend(role.id)}
                      >
                        {role.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No roles found
                </td>
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

      {/* Toast Notification */}
      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </main>
  )
}

export default ProfileManagement
