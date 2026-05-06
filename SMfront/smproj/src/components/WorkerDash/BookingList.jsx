import React from "react";
import BookingCard from "./BookingCard";
import EmptyState from "./EmptyState";

function BookingList({ bookings, onAccept, onReject,onVerifyOTP, onComplete }) {
  if (!bookings || bookings.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="booking-list">
      {bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          onAccept={onAccept}
          onReject={onReject}
          onVerifyOTP={onVerifyOTP}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
}

export default BookingList;