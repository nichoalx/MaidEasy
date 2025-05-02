function Profile() {
    return (
      <main className="profile-content">
        <h1 className="profile-title">My Profile</h1>
  
        <div className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <div className="input-container">
                <i className="input-icon user-icon"></i>
                <input type="text" id="firstName" value="Kieron" readOnly />
              </div>
            </div>
  
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <div className="input-container">
                <i className="input-icon user-icon"></i>
                <input type="text" id="lastName" value="Yolin" readOnly />
              </div>
            </div>
          </div>
  
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <div className="input-container">
                <i className="input-icon calendar-icon"></i>
                <input type="text" id="dob" value="12/10/2004" readOnly />
              </div>
            </div>
  
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <div className="input-container">
                <i className="input-icon phone-icon"></i>
                <input type="text" id="contactNumber" value="82622526" readOnly />
              </div>
            </div>
          </div>
  
          <div className="form-row full-width">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <i className="input-icon email-icon"></i>
                <input type="email" id="email" value="kieronyolin12@gmail.com" readOnly />
              </div>
            </div>
          </div>
  
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <i className="input-icon lock-icon"></i>
                <input type="password" id="password" value="************" readOnly />
                <button className="password-toggle">
                  <i className="icon eye-icon"></i>
                </button>
              </div>
            </div>
  
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <div className="input-container dropdown">
                <i className="input-icon role-icon"></i>
                <input type="text" id="role" value="Cleaner" readOnly />
                <i className="dropdown-icon"></i>
              </div>
            </div>
          </div>
  
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <div className="input-container">
                <span className="status-indicator active"></span>
                <input type="text" id="status" value="Active" readOnly />
              </div>
            </div>
  
            <div className="form-group">
              <label htmlFor="createdDate">Created Date</label>
              <div className="input-container">
                <i className="input-icon calendar-icon"></i>
                <input type="text" id="createdDate" value="09/04/2025" readOnly />
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
  
  export default Profile
  