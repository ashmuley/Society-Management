import React from "react";

function WelcomeCard() {
  return (
    <div className="welcome-card">
      <div>
        <h2>👋 Welcome back</h2>
        <p>
          Manage your service requests, accept bookings, and grow your reputation.
        </p>
      </div>

      <div className="welcome-badge">
        ⭐ Keep your ratings high
      </div>
    </div>
  );
}

export default WelcomeCard;