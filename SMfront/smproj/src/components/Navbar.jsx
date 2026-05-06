import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="nav-logo">
        <Link to="/">LOGO</Link>
      </div>

      {/* Center: Navigation Links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li> <a href="#service">Service</a> </li>
        <li> <a href="#about">About Us</a> </li>
        {/* <li> <a href="#service">Service</a> </li>
        <li> <a href="#about">About Us</a> </li> */}
        
        <li><Link to="/my-bookings">My Bookings</Link></li>
        <li><Link to="/complain">Complain</Link></li>
      </ul>

      {/* Right: Auth Buttons */}
      <div className="nav-auth">
        {!token ? (
          <>
            <Link to="/login" className="auth-link">Login</Link>
            <span className="separator">/</span>
            <Link to="/register" className="auth-link">Sign Up</Link>
          </>
        ) : (
          <button className="auth-link logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;