import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    buildingadd: "",
    flatNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      const res = await API.post("/auth/register", formData);

      alert(res.data.message || "Registration successful");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Register</h2>

        <div className="register-content">
          {/* Left Side Image Area */}
          <div className="register-left">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="register"
            />
          </div>

          {/* Right Side Form */}
          <div className="register-right">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />

            <input
              type="text"
              name="buildingadd"
              placeholder="Building Address"
              onChange={handleChange}
            />

            <input
              type="text"
              name="flatNumber"
              placeholder="Flat Number"
              onChange={handleChange}
            />

            <button onClick={handleSubmit}>Register</button>

            <p className="login-text">
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;