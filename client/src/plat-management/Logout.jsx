import React from "react"
import { useNavigate } from "react-router-dom"
import "./Logout.css";

export default function Logout() {
    const navigate = useNavigate()

    const cancel = () => {
        navigate(-1) 
    }

    return (
        <div className="logoutContainer">
            <div className="header">
                <div className="text">Confirm Logout</div>
            </div>
            <div className="body">
                <div className="text">Are you sure you want to logout?</div>
            </div>
            <div>
                <button className="logoutButton">Logout</button>
                <button className="cancelButton" onClick={cancel}>Cancel</button>
            </div>
        </div>
    );
}