"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Pagination from "./components/Pagination"
import ShowingDropdown from "./components/ShowingDropdown"
import Toast from "./components/Toast"
import SuspendConfirmModal from "./SuspendUserModal"

function AccountManagement() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nick Fury",
      email: "Nickfury@gmail.com",
      role: "Cleaner",
      status: "Active",
      contactNumber: "12893424",
    },
    {
      id: 2,
      name: "Edmond",
      email: "edm@gmail.com",
      role: "Cleaner",
      status: "Active",
      contactNumber: "82345678",
    },
    {
      id: 3,
      name: "Kennegg",
      email: "igogymeeveryday@gmail.com",
      role: "Cleaner",
      status: "Active",
      contactNumber: "87654321",
    },
    {
      id: 4,
      name: "Keegpin",
      email: "eateggdaily@gmail.com",
      role: "Cleaner",
      status: "Active",
      contactNumber: "81234567",
    },
    {
      id: 5,
      name: "Ben Ice Cream",
      email: "jerry@gmail.com",
      role: "Cleaner",
      status: "Active",
      contactNumber: "89876543",
    },
    {
      id: 6,
      name: "John Doe",
      email: "john@example.com",
      role: "Home Owner",
      status: "Active",
      contactNumber: "91234567",
    },
    {
      id: 7,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Home Owner",
      status: "Active",
      contactNumber: "98765432",
    },
    {
      id: 8,
      name: "Robert Johnson",
      email: "robert@example.com",
      role: "Project Management",
      status: "Active",
      contactNumber: "93456789",
    },
    {
      id: 9,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "Cleaner",
      status: "Suspended",
      contactNumber: "96789012",
    },
    {
      id: 10,
      name: "Michael Wilson",
      email: "michael@example.com",
      role: "Home Owner",
      status: "Active",
      contactNumber: "94567890",
    },
    {
      id: 11,
      name: "Sarah Brown",
      email: "sarah@example.com",
      role: "Project Management",
      status: "Active",
      contactNumber: "95678901",
    },
    {
      id: 12,
      name: "David Miller",
      email: "david@example.com",
      role: "Cleaner",
      status: "Active",
      contactNumber: "92345678",
    },
  ])

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
    let results = [...users]

    if (searchTerm) {
      switch (searchBy) {
        case "Name":
          results = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
          break
        case "Email":
          results = users.filter((user) => user.email.toLowerCase().includes(searchTerm.toLowerCase()))
          break
        case "User ID":
          results = users.filter((user) => user.id.toString().includes(searchTerm))
          break
        default:
          results = users.filter(
            (user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase()),
          )
      }
    }

    setFilteredUsers(results)
    setCurrentPage(1) // Reset to first page when search changes
  }, [searchTerm, searchBy, users])

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

  const confirmSuspend = () => {
    if (userToSuspend) {
      // First update the user in the users array
      const updatedUsers = users.map((user) =>
        user.id === userToSuspend.id ? { ...user, status: user.status === "Active" ? "Suspended" : "Active" } : user,
      )

      // Update the state with the new users array
      setUsers(updatedUsers)

      // Show toast notification with the correct message
      setToast({
        show: true,
        message: `User has been ${userToSuspend.status === "Active" ? "suspended" : "activated"}`,
        type: "success",
      })

      // Hide toast after 3 seconds
      setTimeout(() => {
        setToast({ show: false, message: "", type: "" })
      }, 3000)
    }
    setShowSuspendModal(false)
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
