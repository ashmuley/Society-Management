import React, { useEffect, useState } from "react";
import Sidebar from "../components/WorkerDash/Sidebar";
import Topbar from "../components/WorkerDash/Topbar";
import WelcomeCard from "../components/WorkerDash/WelcomeCard";
import StatsCards from "../components/WorkerDash/StatsCards";
import BookingList from "../components/WorkerDash/BookingList";
import API from "../api/axios";
import "../components/WorkerDash/WorkerDash.css";
import Profile from "../components/WorkerDash/Profile";

function WorkerDashboard() {
  const [availableBookings, setAvailableBookings] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("available");

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Fetch both available + worker bookings
const fetchData = async () => {
  try {
    const token = localStorage.getItem("token");

    let availableRes, myRes;

    try {
      availableRes = await API.get("/bookings/available", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Available OK:", availableRes.data);
    } catch (err) {
      console.log("Available ERROR:", err.response?.data || err.message);
    }

    try {
      myRes = await API.get("/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("MyBookings OK:", myRes.data);
    } catch (err) {
      console.log("MyBookings ERROR:", err.response?.data || err.message);
    }

    setAvailableBookings(availableRes?.data?.bookings || []);
    setMyBookings(myRes?.data?.bookings || []);

  } catch (error) {
    console.log(error);
    alert("Failed to load data");
  } finally {
    setLoading(false);
  }
};

  // 🔹 Accept booking
  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/bookings/${id}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // alert("Booking accepted");
      fetchData();
    } catch (error) {
      alert("Failed to accept booking");
    }
  };

  // 🔹 Reject booking
  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/bookings/${id}/reject`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Booking rejected");
      fetchData();
    } catch (error) {
      alert("Failed to reject booking");
    }
  };

  // 🔹 Split bookings
  const acceptedBookings = myBookings.filter(
    (b) => b.status === "accepted"
  );

  const inProgressBookings = myBookings.filter(
    (b) => b.status === "in_progress"
  );

  const completedBookings = myBookings.filter(
    (b) => b.status === "completed"
  );


      const handleVerifyOTP = async (id, otp) => {
  try {
    const token = localStorage.getItem("token");

    await API.put(
      `/bookings/${id}/verify-otp`,
      { otp },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    alert("OTP verified. Work started.");
    fetchData();
  } catch (error) {
    alert(error.response?.data?.message || "OTP failed");
  }
};

const handleComplete = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await API.put(
      `/bookings/${id}/complete`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    alert("Job completed");
    fetchData();
  } catch (error) {
    alert("Failed to complete job");
  }
};


  return (
    <div className="dashboard-layout">
      
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className="dashboard-main">

        <Topbar />

        <div className="dashboard-content">

          <WelcomeCard />

          {/* Combine all bookings for stats */}
          <StatsCards bookings={[...availableBookings, ...myBookings]} />

          {/* 🔹 Available */}
          {activeSection === "available" && (
            <>
              <h2 className="section-title">Available Requests</h2>

              {loading ? (
                <p className="loading-text">Loading...</p>
              ) : (
                <BookingList
                  bookings={availableBookings}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onVerifyOTP={handleVerifyOTP}
                  onComplete={handleComplete}
                />
              )}
            </>
          )}

          {/* 🔹 Accepted */}
          {activeSection === "accepted" && (
            <>
              <h2 className="section-title">Accepted Jobs</h2>

              <BookingList
                bookings={[...acceptedBookings, ...inProgressBookings]}
                onAccept={handleAccept}
                onReject={handleReject}
                onVerifyOTP={handleVerifyOTP}
                onComplete={handleComplete}
              />
            </>
          )}

          {/* 🔹 Completed */}
          {activeSection === "completed" && (
            <>
              <h2 className="section-title">Completed Jobs</h2>

              <BookingList
                bookings={completedBookings}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            </>
          )}

          {/* 🔹 Profile */}
          {activeSection === "profile" && (
             <>
                <h2 className="section-title">My Profile</h2>
                <Profile />
              </>
            )}

        </div>
      </div>
    </div>
  );
}

export default WorkerDashboard;


// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/WorkerDash/Sidebar";
// import Topbar from "../components/WorkerDash/Topbar";
// import WelcomeCard from "../components/WorkerDash/WelcomeCard";
// import StatsCards from "../components/WorkerDash/StatsCards";
// import BookingList from "../components/WorkerDash/BookingList";
// import API from "../api/axios";
// import "../components/WorkerDash/WorkerDash.css";

// function WorkerDashboard() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeSection, setActiveSection] = useState("available");

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   // 🔹 Fetch available bookings
//   const fetchBookings = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await API.get("/bookings/available", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setBookings(res.data.bookings || []);
//     } catch (error) {
//       console.log(error);
//       alert("Failed to load requests");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Accept booking
//   const handleAccept = async (id) => {
//     try {
//       const token = localStorage.getItem("token");

//       await API.put(
//         `/bookings/${id}/accept`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("Booking accepted");
//       fetchBookings();
//     } catch (error) {
//       alert("Failed to accept booking");
//     }
//   };

//   // 🔹 Reject booking
//   const handleReject = async (id) => {
//     try {
//       const token = localStorage.getItem("token");

//       await API.put(
//         `/bookings/${id}/reject`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       alert("Booking rejected");
//       fetchBookings();
//     } catch (error) {
//       alert("Failed to reject booking");
//     }
//   };

//   return (
//     <div className="dashboard-layout">
      
//       {/* Sidebar */}
//       <Sidebar 
//       activeSection={activeSection}
//       setActiveSection={setActiveSection}
//   />

//       {/* Main Content */}
//       <div className="dashboard-main">

//         {/* Topbar */}
//         <Topbar />

//         {/* Content */}
//         <div className="dashboard-content">

//           <WelcomeCard />

//           <StatsCards bookings={bookings} />

          
//             {activeSection === "available" && (
//   <>
//     <h2 className="section-title">Available Requests</h2>
//     <BookingList
//       bookings={bookings}
//       onAccept={handleAccept}
//       onReject={handleReject}
//     />
//   </>
// )}

// {activeSection === "accepted" && (
//   <h2 className="section-title">Accepted Jobs (Coming next)</h2>
// )}

// {activeSection === "completed" && (
//   <h2 className="section-title">Completed Jobs (Coming next)</h2>
// )}

// {activeSection === "profile" && (
//   <h2 className="section-title">Profile (Coming next)</h2>
// )}

//         </div>
//       </div>
//     </div>
//   );
// }

// export default WorkerDashboard;

