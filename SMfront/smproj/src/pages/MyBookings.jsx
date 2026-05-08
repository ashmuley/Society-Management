import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "./MyBookings.css";
import Navbar from "@/components/Navbar";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data.bookings);
    } catch (error) {
      console.log(error);
      // alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="loading-text">Loading...</h2>;
  }

  const handleCancelBooking = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await API.put(
      `/bookings/${id}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Booking cancelled");

    fetchBookings();

  } catch (error) {
    alert(error.response?.data?.message || "Cancel failed");
  }
};

  return (
    <>
    <Navbar/>
    
    
    <div className="mybookings-page">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="empty-bookings">No bookings found.</p>
      ) : (
        <div className="booking-lists">
          {bookings.map((booking) => (
            <div className="booking-cards" key={booking._id}>
              <h2 id="h2-jobname" >{booking.serviceId?.name}</h2>

              <p id="p-jobdes" >{booking.serviceId?.description}</p>

              <p>
                <strong>Date:</strong> {booking.bookingDate}
              </p>

              <p>
                <strong>Time:</strong> {booking.bookingTime}
              </p>

              <p>
                <strong>Status:</strong> {booking.status}
              </p>

              {booking.status === "accepted" && (
                <div className="otp-box">
                  <p className="otp-label">Share this OTP with your service provider:</p>
                  <div className="otp-value">{booking.otp}</div>
                </div>
              )}

              {booking.workerId && (
                <p>
                  <strong>Worker:</strong> {booking.workerId.name}
                </p>
              )}

              {booking.price > 0 && (
                <p>
                  <strong>Price:</strong> ₹{booking.price}
                </p>
              )}

              {booking.status === "pending" && (
                  <button
                    className="cancel-booking-btn"
                   onClick={() => handleCancelBooking(booking._id)}
                  >
                   Cancel Booking
                  </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default MyBookings;