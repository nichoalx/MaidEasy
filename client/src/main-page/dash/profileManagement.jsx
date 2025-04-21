function ProfileManagement() {
    const roles = [
      {
        id: 1,
        name: "Admin",
        users: 2,
        status: "Active",
      },
      {
        id: 2,
        name: "Cleaner",
        users: 20,
        status: "Active",
      },
      {
        id: 3,
        name: "Home Owner",
        users: 68,
        status: "Active",
      },
      {
        id: 4,
        name: "Baby Sitter",
        users: 13,
        status: "Inactive",
      },
    ]
  
    return (
      <main className="profile-management-content">
        <h1 className="profile-management-title">User Profile Management</h1>
  
        <div className="profile-management-controls">
          <div className="search-container">
            <label className="search-label">Input Role</label>
            <div className="search-input-container">
              <i className="icon search-icon"></i>
              <input type="text" placeholder="Search by role" className="search-input" />
            </div>
          </div>
  
          <div className="profile-management-actions">
            <div className="showing-dropdown">
              <span className="showing-label">Showing :</span>
              <div className="dropdown">
                <button className="dropdown-button">
                  10
                  <i className="dropdown-icon"></i>
                </button>
              </div>
            </div>
  
            <button className="add-profile-button">
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
              {roles.map((role) => (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>{role.users}</td>
                  <td>
                    <span className={`status-badge ${role.status.toLowerCase()}`}>{role.status}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="view-button">View</button>
                      <button className="edit-button">Edit</button>
                      <button className="suspend-button">Suspend</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <div className="pagination">
            <button className="next-button">
              Next <span className="next-icon">›</span>
            </button>
          </div>
        </div>
      </main>
    )
  }
  
  export default ProfileManagement
  