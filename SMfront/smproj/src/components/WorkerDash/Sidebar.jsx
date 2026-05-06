import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ activeSection, setActiveSection }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="sidebar">

      {/* LOGO / TITLE */}
      <div className="sidebar-header">
        <h2>FixItRight</h2>
        <p>Service Provider</p>
      </div>

      {/* MENU */}
      <ul className="sidebar-menu">
  <li 
    className={activeSection === "available" ? "active" : ""}
    onClick={() => setActiveSection("available")}
  >
    📋 Available Requests
  </li>

  <li 
    className={activeSection === "accepted" ? "active" : ""}
    onClick={() => setActiveSection("accepted")}
  >
    ✔ Accepted Jobs
  </li>

  <li 
    className={activeSection === "completed" ? "active" : ""}
    onClick={() => setActiveSection("completed")}
  >
    ⭐ Completed Jobs
  </li>

  <li 
    className={activeSection === "profile" ? "active" : ""}
    onClick={() => setActiveSection("profile")}
  >
    👤 My Profile
  </li>
</ul>

      {/* LOGOUT */}
      <div className="sidebar-footer">
        <button onClick={handleLogout}>🚪 Logout</button>
      </div>

    </div>
  );
}

export default Sidebar;