// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import Home from "../pages/Home";
// import ServiceBooking from "../pages/ServiceBooking";
// import MyBookings from "../pages/MyBookings";
// import Complaint from "../pages/Complaint";


// function AppRoutes() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Dynamic Service Booking Page */}
//         <Route path="/services/:serviceName" element={<ServiceBooking />}/>

//         <Route path="/my-bookings" element={<MyBookings />} />
//         <Route path="/complain" element={<Complaint />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default AppRoutes;

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Complaint from "../pages/Complaint";
import MyBookings from "../pages/MyBookings";
import ServiceBooking from "../pages/ServiceBooking";
import PageTransition from "../components/PageTransition";
import WorkerRegister from "../pages/WorkerRegister";
import WorkerDashboard from "@/pages/WorkerDashboard";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />

        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />

        <Route
          path="/complain"
          element={
            <PageTransition>
              <Complaint />
            </PageTransition>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <PageTransition>
              <MyBookings />
            </PageTransition>
          }
        />
        <Route
          path="/worker/dashboard"
          element={
            <PageTransition>
              <WorkerDashboard />
            </PageTransition>
          }
        />

        <Route
  path="/services/:serviceName"
  element={
    <PageTransition>
      <ServiceBooking />
    </PageTransition>
  }
/>

      <Route path="/worker-register" element={<WorkerRegister />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default AppRoutes;