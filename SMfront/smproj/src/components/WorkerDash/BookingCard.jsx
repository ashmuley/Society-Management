// import React from "react";

// function BookingCard({ booking, onAccept, onReject }) {
//   return (
//     <div className="booking-card">

//       <h3>{booking.serviceId?.name}</h3>

//       <p><strong>Date:</strong> {booking.bookingDate}</p>
//       <p><strong>Time:</strong> {booking.bookingTime}</p>
//       <p><strong>Status:</strong> {booking.status}</p>

//       <div className="booking-buttons">
//         <button
//           className="accept-btn"
//           onClick={() => onAccept(booking._id)}
//         >
//           Accept
//         </button>

//         <button
//           className="reject-btn"
//           onClick={() => onReject(booking._id)}
//         >
//           Reject
//         </button>
//       </div>

//     </div>
//   );
// }

// export default BookingCard;


import React, { useState } from "react";

function BookingCard({ booking, onAccept, onReject, onVerifyOTP, onComplete }) {
  const [otp, setOtp] = useState("");

  return (
    <div className="booking-card">
      <h3>{booking.serviceId?.name}</h3>

      <p><strong>Date:</strong> {booking.bookingDate}</p>
      <p><strong>Time:</strong> {booking.bookingTime}</p>
      <p><strong>Status:</strong> {booking.status}</p>

      {/* 🔹 AVAILABLE (pending) */}
      {booking.status === "pending" && (
        <div className="booking-buttons">
          <button
            className="accept-btn"
            onClick={() => onAccept(booking._id)}
          >
            Accept
          </button>

          <button
            className="reject-btn"
            onClick={() => onReject(booking._id)}
          >
            Reject
          </button>
        </div>
      )}

      {/* 🔹 ACCEPTED → ENTER OTP */}
      {booking.status === "accepted" && (
        <div className="otp-section">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            className="verify-btn"
            onClick={() => onVerifyOTP(booking._id, otp)}
          >
            Verify OTP
          </button>
        </div>
      )}

      {/* 🔹 IN PROGRESS → COMPLETE */}
      {booking.status === "in_progress" && (
        <button
          className="complete-btn"
          onClick={() => onComplete(booking._id)}
        >
          Mark as Completed
        </button>
      )}
    </div>
  );
}

export default BookingCard;