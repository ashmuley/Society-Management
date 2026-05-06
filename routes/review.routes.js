const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

const { createReview } = require("../controller/review.controller");

router.post(
  "/",
  protect,
  authorizeRoles("resident"),
  createReview
);

module.exports = router;