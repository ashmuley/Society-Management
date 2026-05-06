import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./ServiceBooking.css";
import Navbar from "@/components/Navbar";

function ServiceBooking() {
  const { serviceName } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bookingDate: "",
    bookingTime: "",
    issue: "",
  });

  const formattedName = serviceName
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const serviceIds = {
    plumber: "69917718855aa51c8fd22e42",
    electrician: "69e3db80d61872ac0ba153a9",
    carpenter: "699187263576b218f4a0eebd",
    cleaner: "69d106a5f99991985f324666",
    painter: "69e3dba6d61872ac0ba153ab",
    "ac-repair": "69e3dbbfd61872ac0ba153ad",
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/bookings",
        {
          serviceId: serviceIds[serviceName],
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking request sent successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <> <Navbar/>
    <div className="booking-page">
      <div className="booking-card">
        <h1>Book {formattedName} Service</h1>
        <p className="booking-subtitle">
          Fill the details below to place your request.
        </p>

        <input
          type="date"
          name="bookingDate"
          onChange={handleChange}
          className="booking-input"
        />

        <input
          type="time"
          name="bookingTime"
          onChange={handleChange}
          className="booking-input"
        />

        <textarea
          name="issue"
          placeholder="Describe your issue"
          onChange={handleChange}
          className="booking-input booking-textarea"
        />

        <button onClick={handleBooking} className="booking-btn">
          Book Now
        </button>
      </div>
    </div>
    </>
  );
}

export default ServiceBooking;