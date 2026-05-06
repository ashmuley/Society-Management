import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./WorkerRegister.css";

function WorkerRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    service: "",
    experience: "",
    hourlyRate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post("/auth/register-worker", formData);
      alert(res.data.message || "Worker registered successfully");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="worker-page">
      <div className="worker-card">
        <h1 className="worker-title">Register</h1>
        <div className="form-grid">

        <div className="field-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="worker-input"
          />
        </div>

        <div className="field-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="worker-input"
          />
        </div>

        <div className="field-group">
          <label>Password</label>
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              className="worker-input"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        <div className="field-group">
          <label>Service</label>
          <select
            name="service"
            onChange={handleChange}
            className="worker-input"
          >
            <option value="">Select Service</option>
            <option value="Plumber">Plumber</option>
            <option value="Electrician">Electrician</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Painter">Painter</option>
            <option value="AC Repair">AC Repair</option>
          </select>
        </div>

        <div className="field-group">
          <label>Experience (Years)</label>
          <input
            type="number"
            name="experience"
            onChange={handleChange}
            className="worker-input"
          />
        </div>

        <div className="field-group">
          <label>Hourly Rate</label>
          <input
            type="number"
            name="hourlyRate"
            onChange={handleChange}
            className="worker-input"
          />
        </div>
    </div>
        <button onClick={handleSubmit} className="worker-btn">
          Register
        </button>

        <p className="worker-login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default WorkerRegister;
