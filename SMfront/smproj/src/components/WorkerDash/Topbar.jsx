import React from "react";
import "./Topbar.css";

function Topbar() {
    const name = localStorage.getItem("name") || "Provider";

  return (
    <div className="topbar">

      {/* LEFT */}
      <div className="topbar-left">
        <h2>Dashboard</h2>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">

        {/* Notification */}
        <div className="topbar-icon">
          🔔
        </div>

        {/* Profile */}
        <div className="topbar-profile">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
          />
          <span>{name}</span>
        </div>

      </div>

    </div>
  );
}

export default Topbar;