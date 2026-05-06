import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
  try {
    const res = await API.post("/auth/login", formData);

    const { token, role , user } = res.data;

    // store data
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("name", user?.name || "Provider");

    // 🔥 role-based redirect
    if (role === "worker") {
      navigate("/worker/dashboard");
    } else {
      navigate("/");
    }

  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="login-page">
      <div className="login-card">
        {/* Left Side */}
        <div className="login-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="login"
          />
        </div>

        {/* Right Side */}
        <div className="login-right">
          <h2>Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />

          <button onClick={handleSubmit}>Login</button>

          <p className="signup-text">
            Don’t have an account?{" "}
            <Link to="/register" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;