function AccountManagement() {
    const users = [
    {
        id: 1,
        name: "Nick Fury",
        email: "Nickfury@gmail.com",
        role: "Cleaner",
        status: "Active",
    },
    {
        id: 2,
        name: "Edmond",
        email: "edm@gmail.com",
        role: "Cleaner",
        status: "Active",
    },
    {
        id: 3,
        name: "Kennegg",
        email: "igogymeeveryday@gmail.com",
        role: "Cleaner",
        status: "Active",
    },
    {
        id: 4,
        name: "Keegpin",
        email: "eateggdaily@gmail.com",
        role: "Cleaner",
        status: "Active",
    },
    {
        id: 5,
        name: "Ben Ice Cream",
        email: "jerry@gmail.com",
        role: "Cleaner",
        status: "Active",
      },
    ]
  
    return (
      <main className="account-content">
        <h1 className="account-title">User Account</h1>
  
        <div className="account-controls">
          <div className="search-container">
            <label className="search-label">Input Name or Email</label>
            <div className="search-input-container">
              <i className="icon search-icon"></i>
              <input type="text" placeholder="Search By Name or Email" className="search-input" />
            </div>
          </div>
  
          <div className="account-actions">
            <div className="showing-dropdown">
              <span className="showing-label">Showing :</span>
              <div className="dropdown">
                <button className="dropdown-button">
                  10
                  <i className="dropdown-icon"></i>
                </button>
              </div>
            </div>
  
            <button className="add-account-button">
              <span>+</span> Add New Account
            </button>
          </div>
        </div>
  
        <div className="account-table-container">
          <table className="account-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className="status-badge active">{user.status}</span>
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

export default AccountManagement
