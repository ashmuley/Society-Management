const Booking =require("../model/booking.model");
const User =require("../model/User.model");
const Service =require("../model/service.model");

const createBooking = async(req, res)=>{
    try{
        const{serviceId, bookingDate, bookingTime} = req.body;
        
        const residentId= req.user.id;

        // Check required fields
        if (!serviceId || !bookingDate || !bookingTime) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        // //check worker exist or not
        // const worker = await User.findById(workerId);

        // if(!worker || worker.role !== "worker"){
        //     return res.status(404).json({
        //         success: false,
        //         message:"worker not found",
        //     });
        // }
        // // Worker must be verified
        // if (!worker.verified) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Worker is not verified",
        //     });
        // }

        const service = await Service.findById(serviceId);

        if(!service){
            return res.status(404).json({
                success: false,
                message: "service not found",
            });
        }

        // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        // Create booking
        const booking = await Booking.create({
            residentId,
            // workerId,
            serviceId,
            bookingDate,
            bookingTime,
            otp,
            price:0,
            workerId:null,
            // price: worker.hourlyRate,
            status: "pending",
        });

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking,
        });
        
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getBookings = async (req, res) => {
  try {
    let bookings;

    // Resident
      if (req.user.role === "resident") {
        bookings = await Booking.find({ residentId: req.user.id })
          .populate("workerId", "name email service averageRating")
          .populate("serviceId", "name description")
          .sort({ createdAt: -1 });
      }

    // Worker
    else if (req.user.role === "worker") {
      bookings = await Booking.find({ workerId: req.user.id })
        .select("-otp")
        .populate("residentId", "name email")
        .populate("serviceId", "name description")
        .sort({ createdAt: -1 });
    }

    // Admin
    else if (req.user.role === "admin") {
      bookings = await Booking.find()
        .populate("residentId", "name email")
        .populate("workerId", "name email service")
        .populate("serviceId", "name description")
        .sort({ createdAt: -1 });
    }

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const acceptBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only assigned worker can accept
    // if (booking.workerId.toString() !== req.user.id) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Not authorized for this booking",
    //   });
    // }

    // Only pending booking
    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Booking is not pending",
      });
    }
    // Get logged-in worker details
    const worker = await User.findById(req.user.id);

    if (!worker || worker.role !== "worker") {
      return res.status(403).json({
        success: false,
        message: "Worker not found",
      });
    }

    // Assign worker + price + status
    booking.workerId = req.user.id;
    booking.price = worker.hourlyRate;
    booking.status = "accepted";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking accepted successfully",
      booking,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const rejectBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only assigned worker can reject
    if (booking.workerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized for this booking",
      });
    }

    // Only pending booking
    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Booking is not pending",
      });
    }

    booking.status = "rejected";
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking rejected successfully",
      booking,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyOTP = async (req,res)=>{
    try{
        const bookingId = req.params.id;
        const{otp}= req.body;

        const booking = await Booking.findById(bookingId);
        console.log("=== OTP DEBUG START ===");
        console.log("Entered OTP:", otp);
        console.log("Actual OTP:", booking?.otp);
        console.log("Type Entered:", typeof otp);
        console.log("Type Actual:", typeof booking?.otp);
        console.log("=== OTP DEBUG END ===");

        if(!booking){
            return res.status(404).json({
                success:false,
                message:"booking not found",
            });
        }

        // Only assigned worker can verify
        if (booking.workerId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized for this booking",
            });
        }

    // Booking must be accepted first
        if (booking.status !== "accepted") {
        return res.status(400).json({
            success: false,
            message: "Booking is not accepted yet",
            });
        }

    // OTP check
        // if (booking.otp !== otp) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid OTP",
        //   });
        //  }
      const enteredOtp = otp.toString().trim();
      const actualOtp = booking.otp.toString().trim();

      if (enteredOtp !== actualOtp) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }

        booking.status = "in_progress";
        await booking.save();

        return res.status(200).json({
            success: true,
            message: "OTP verified. Work started.",
            booking,
        });
        
        //debug
        
      }catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };


const completeBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only assigned worker
    if (booking.workerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized for this booking",
      });
    }

    // Must be in progress
    if (booking.status !== "in_progress") {
      return res.status(400).json({
        success: false,
        message: "Booking is not in progress",
      });
    }

    booking.status = "completed";
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking completed successfully",
      booking,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAvailableRequests = async (req, res) => {
  try {
    const worker = await User.findById(req.user.id);

    if (!worker || worker.role !== "worker") {
      return res.status(403).json({
        success: false,
        message: "Worker not found",
      });
    }

    // Find service document using worker.service name
    const service = await Service.findOne({ name: worker.service });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found for worker",
      });
    }

    const bookings = await Booking.find({
      status: "pending",
      serviceId: service._id,
      workerId: null,
    })
      .populate("residentId", "name building flatNumber phone")
      .populate("serviceId", "name description")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only booking owner can cancel
    if (booking.residentId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Only pending bookings can be cancelled
    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending bookings can be cancelled",
      });
    }

    booking.status = "cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {createBooking,
    getBookings,
    acceptBooking,
    rejectBooking,
    verifyOTP,
    completeBooking,
    getAvailableRequests,
    cancelBooking,
};