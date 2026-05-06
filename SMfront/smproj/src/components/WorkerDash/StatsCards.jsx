import React from "react";

function StatsCards({ bookings }) {

  const pending = bookings.filter(b => b.status === "pending").length;
  const accepted = bookings.filter(b => b.status === "accepted").length;
  const completed = bookings.filter(b => b.status === "completed").length;

  return (
    <div className="stats-container">

      <div className="stat-card">
        <h3>{pending}</h3>
        <p>Pending Requests</p>
      </div>

      <div className="stat-card">
        <h3>{accepted}</h3>
        <p>Accepted Jobs</p>
      </div>

      <div className="stat-card">
        <h3>{completed}</h3>
        <p>Completed Jobs</p>
      </div>

    </div>
  );
}

export default StatsCards;