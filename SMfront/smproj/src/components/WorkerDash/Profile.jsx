import React, { useEffect, useState } from "react";
import API from "../../api/axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
    } catch (error) {
      console.log(error);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="loading-text">Loading profile...</p>;
  }

  if (!user) {
    return <p className="empty-text">No profile data found</p>;
  }

  return (
    <div className="profile-card">
      <h2>👤 My Profile</h2>

      <div className="profile-item">
        <strong>Name:</strong> {user.name || "N/A"}
      </div>

      <div className="profile-item">
        <strong>Email:</strong> {user.email || "N/A"}
      </div>

      <div className="profile-item">
        <strong>Service:</strong> {user.service || "N/A"}
      </div>

      <div className="profile-item">
        <strong>Hourly Rate:</strong>{" "}
        {user.hourlyRate ? `₹${user.hourlyRate}` : "Not set"}
      </div>
    </div>
  );
}

export default Profile;