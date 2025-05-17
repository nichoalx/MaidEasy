"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Pagination from "./components/Pagination"
import ShowingDropdown from "./components/ShowingDropdown"
import Toast from "./components/Toast"
import SuspendConfirmModal from "./SuspendUserModal"
import axios from "../../utils/axiosInstance"; 


function AccountManagement() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  // State for search, pagination, and modals
  const [searchTerm, setSearchTerm] = useState("")
  const [searchBy, setSearchBy] = useState("Name")
  const [searchByOpen, setSearchByOpen] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [toast, setToast] = useState({ show: false, message: "", type: "" })

  // Filter users based on search term and search criteria
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/users");
        console.log("Fetched users:", data); 

        const formatted = data.success.map((user) => ({
          id: user.user_id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.profile_name,
          status: user.is_active ? "Active" : "Suspended",
          contactNumber: user.contact_number
        }));
        setUsers(formatted);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let results = [...users];

    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();

      switch (searchBy) {
        case "Name":
          results = results.filter((user) => user.name.toLowerCase().includes(lower));
          break;
        case "Email":
          results = results.filter((user) => user.email.toLowerCase().includes(lower));
          break;
        case "User ID":
          results = results.filter((user) => user.id.toString().includes(lower));
          break;
        default:
          break;
      }
    }

    setFilteredUsers(results);
    setCurrentPage(1); // reset page on new search
  }, [users, searchTerm, searchBy]);



  // Get current users for pagination
  const indexOfLastUser = currentPage * itemsPerPage
  const indexOfFirstUser = indexOfLastUser - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  // Handle edit user
  const handleEdit = (userId) => {
    navigate(`/edit-user/${userId}`)
  }

  // Handle view user
  const handleView = (userId) => {
    navigate(`/view-user/${userId}`)
  }

  // Handle add new user
  const handleAddUser = () => {
    navigate("/add-user")
  }

  // Handle suspend user
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  const [userToSuspend, setUserToSuspend] = useState(null)

  const handleSuspend = (userId) => {
    const user = users.find((u) => u.id === userId)
    setUserToSuspend(user)
    setShowSuspendModal(true)
  }

  const confirmSuspend = async () => {
    if (!userToSuspend) return;

    const isCurrentlyActive = userToSuspend.status === "Active";
    const endpoint = isCurrentlyActive
      ? `/api/users/suspend/${userToSuspend.id}`
      : `/api/users/activate/${userToSuspend.id}`;

    try {
      const { data } = await axios.put(endpoint);

      const updatedUsers = users.map((user) =>
        user.id === userToSuspend.id
          ? { ...user, status: isCurrentlyActive ? "Suspended" : "Active" }
          : user
      );

      setUsers(updatedUsers);

      setToast({
        show: true,
        message: `User has been ${isCurrentlyActive ? "suspended" : "activated"}`,
        type: "success",
      });

      setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);
    } catch (error) {
      console.error(`${isCurrentlyActive ? "Suspend" : "Activate"} error:`, error);
      setToast({
        show: true,
        message: `Failed to ${isCurrentlyActive ? "suspend" : "activate"} user`,
        type: "error",
      });
    }

    setShowSuspendModal(false);
  };


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
    <main className="account-content">
      <h1 className="account-title">User Account</h1>

      <div className="account-controls">
        <div className="search-container">
          <div className="search-header">
            <label>Keyword</label>
            <div className="search-by-container">
              <label className="search-by-label">Search By</label>
              <div className="search-by-dropdown">
                <div className="search-by-selected" onClick={() => setSearchByOpen(!searchByOpen)}>
                  {searchBy} <span className="dropdown-arrow">▼</span>
                </div>
                {searchByOpen && (
                  <div className="search-by-options">
                    <div
                      className={`search-by-option ${searchBy === "Name" ? "active" : ""}`}
                      onClick={() => {
                        setSearchBy("Name")
                        setSearchByOpen(false)
                      }}
                    >
                      Name
                    </div>
                    <div
                      className={`search-by-option ${searchBy === "Email" ? "active" : ""}`}
                      onClick={() => {
                        setSearchBy("Email")
                        setSearchByOpen(false)
                      }}
                    >
                      Email
                    </div>
                    <div
                      className={`search-by-option ${searchBy === "User ID" ? "active" : ""}`}
                      onClick={() => {
                        setSearchBy("User ID")
                        setSearchByOpen(false)
                      }}
                    >
                      User ID
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder={`Search by ${searchBy.toLowerCase()}`}
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="results-info">
            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
            {filteredUsers.length} results
          </div>
        </div>

        <div className="account-actions">
          <ShowingDropdown value={itemsPerPage} onChange={setItemsPerPage} options={[5, 10, 15, 20]} />

          <button className="add-account-button" onClick={handleAddUser}>
            <span>+</span> Add New Account
          </button>
        </div>
      </div>

      <div className="account-table-container">
        <table className="account-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="view-button" onClick={() => handleView(user.id)}>
                        View
                      </button>
                      <button className="edit-button" onClick={() => handleEdit(user.id)}>
                        Edit
                      </button>
                      <button
                        className={user.status === "Active" ? "suspend-button" : "edit-button"}
                        onClick={() => handleSuspend(user.id)}
                      >
                        {user.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No users found
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

      {/* Suspend Confirmation Modal */}
      {showSuspendModal && userToSuspend && (
        <SuspendConfirmModal
          user={userToSuspend}
          onClose={() => setShowSuspendModal(false)}
          onConfirm={confirmSuspend}
        />
      )}
      {/* Toast Notification */}
      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </main>
  )
}

export default AccountManagement
