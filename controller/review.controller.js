const Review = require("../model/review.model");
const Booking = require("../model/booking.model");
const User = require("../model/User.model");

const createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    // Required fields
    if (!bookingId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Booking ID and rating are required",
      });
    }

    // Find booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Must be user's own booking
    if (booking.residentId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized for this booking",
      });
    }

    // Must be completed
    if (booking.status !== "completed") {
      return res.status(400).json({
        success: false,
        message: "You can review only after completion",
      });
    }

    // Already reviewed?
    const existingReview = await Review.findOne({ bookingId });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "Review already submitted",
      });
    }

    // Create review
    const review = await Review.create({
      bookingId,
      residentId: req.user.id,
      workerId: booking.workerId,
      rating,
      comment,
    });

    // Update worker rating stats
    const reviews = await Review.find({ workerId: booking.workerId });

    const totalReviews = reviews.length;

    const averageRating =
      reviews.reduce((sum, item) => sum + item.rating, 0) / totalReviews;

    await User.findByIdAndUpdate(booking.workerId, {
      totalReviews,
      averageRating: averageRating.toFixed(1),
    });

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createReview };