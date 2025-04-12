import React, { useState } from "react";
import "./Logout.css";

export default function Logout() {

    return (
        <div className="logout-container">
            <div className="header">
                <div className="text">Confirm Logout</div>
            </div>
            <div className="body">
                <div className="text">Are you sure you want to logout?</div>
            </div>
            <div>
                <button className="logout-button">Logout</button>
                <button className="cancel-button">Cancel</button>
            </div>
        </div>
    );
}