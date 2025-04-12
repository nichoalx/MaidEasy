import React, { useState } from "react";
import "./CreateProfile.css";
import circle_person_icon from "./Assets/circle_person.png";

export default function CreateProfile() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permission, setPermission] = useState("Book Permission");
  const [errors, setErrors] = useState({ name: false, description: false });

  const handleSubmit = () => {
    const newErrors = {
      name: name.trim() === "",
      description: description.trim() === "",
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.description) {
      alert(`Profile Created:\nRole: ${name}\nDescription: ${description}\nPermission: ${permission}`);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <div className="text">Create New Profile</div>
      </div>

      <div className="group">
        <div className="groups">
          <label>Role Name</label>
          <div className={`inputs ${errors.name ? "error" : ""}`}>
            <img src={circle_person_icon} alt="circle person icon" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={errors.name ? "This field must be filled in!" : "Role Name"}
            />
          </div>
        </div>

        <div className="groups">
          <label>Description</label>
          <div className={`inputs ${errors.description ? "error" : ""}`} style={{ padding: 0 }}>
            <textarea
              className="custom-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={errors.description ? "This field must be filled in!" : "Enter Role Descriptions"}
              rows={4}
            />
          </div>
        </div>

        <div className="groups">
          <div className="radio-group">
          <label>
            <input
                type="radio"
                name="permission"
                value="Book Permission"
                checked={permission === "Book Permission"}
                onChange={(e) => setPermission(e.target.value)}
            />
            <span className="checkmark"></span>
            Book Permission
        </label>
        <label>
            <input
                type="radio"
                name="permission"
                value="Listing Permission"
                checked={permission === "Listing Permission"}
                onChange={(e) => setPermission(e.target.value)}
            />
            <span className="checkmark"></span>
            Listing Permission
        </label>
        <label>
            <input
                type="radio"
                name="permission"
                value="View Analytics Permission"
                checked={permission === "View Analytics Permission"}
                onChange={(e) => setPermission(e.target.value)}
            />
            <span className="checkmark"></span>
            View Analytics Permission
        </label>
          </div>
        </div>

        <button className="login-button" onClick={handleSubmit}>
          Create Profile
        </button>
      </div>
    </div>
  );
}

