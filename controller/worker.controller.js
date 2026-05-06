const User = require("../model/User.model");

// 1️⃣ GET PENDING WORKERS
exports.getPendingWorkers = async (req, res) => {
  try {
    const workers = await User.find({
      role: "worker",
      verified: false,
    }).select("-password"); // hide password

    res.status(200).json({
      success: true,
      count: workers.length,
      workers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 2️⃣ VERIFY WORKER
exports.verifyWorker = async (req, res) => {
  try {
    const { id } = req.params;

    const worker = await User.findById(id);

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    if (worker.role !== "worker") {
      return res.status(400).json({
        success: false,
        message: "User is not a worker",
      });
    }

    // update verified status
    worker.verified = true;
    await worker.save();

    res.status(200).json({
      success: true,
      message: "Worker verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};