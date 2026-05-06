const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

const {
  getPendingWorkers,
  verifyWorker,
} = require("../controller/worker.controller");

// 🔐 Admin only routes

// Get all pending workers
router.get("/pending", protect, authorizeRoles("admin"), getPendingWorkers);

// Verify worker
router.put("/:id/verify", protect, authorizeRoles("admin"), verifyWorker);

module.exports = router;