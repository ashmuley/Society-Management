const express =require("express");
const router = express.Router();

const {protect} = require("../middleware/auth.middleware");
const {authorizeRoles} = require("../middleware/role.middleware");

const {createBooking, getBookings,acceptBooking, rejectBooking,verifyOTP,completeBooking,getAvailableRequests} = require("../controller/booking.controller");

router.post(
    "/",
    protect,
    authorizeRoles("resident"),
    createBooking
);

router.get(
    "/",protect,getBookings);

router.put(
  "/:id/accept",
  protect,
  authorizeRoles("worker"),
  acceptBooking
);

router.put(
  "/:id/reject",
  protect,
  authorizeRoles("worker"),
  rejectBooking
);

router.put(
    "/:id/verify-otp",
    protect,
    authorizeRoles("worker"),
    verifyOTP
);

router.put(
  "/:id/complete",
  protect,
  authorizeRoles("worker"),
  completeBooking
);

router.get(
  "/available",
  protect,
  authorizeRoles("worker"),
  getAvailableRequests
);

module.exports = router;