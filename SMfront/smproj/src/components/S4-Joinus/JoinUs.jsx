import React from "react";
import { useNavigate } from "react-router-dom";
import "./JoinUs.css";
import joinus from "@/assets/joinus.png";
import heroimg from "../../assets/R4.png";

function JoinUs() {
  const navigate = useNavigate();

  return (
    <section className="join-section">
      <div className="join-container">

        {/* LEFT SIDE */}
        <div className="join-left">
          {/* <span className="join-tag">Join Our Community</span> */}

          <h2>
            Want to <span>work with us?</span>
          </h2>

          <p>
            Become a trusted Service Provider and start earning by helping
            residents in your community.
          </p>

          <div className="join-features">
            <div className="feature">
                
              <h4>Flexible Work</h4>
              <p>Work on your own time</p>
            </div>

            <div className="feature">
              <h4>More Opportunities</h4>
              <p>Receive regular job requests</p>
            </div>

            <div className="feature">
              <h4>Secure & Reliable</h4>
              <p>Verified bookings & payments</p>
            </div>

            <div className="feature">
              <h4>Grow Your Reputation</h4>
              <p>Build ratings & trust</p>
            </div>
          </div>

          <button
            className="join-btn"
            onClick={() => navigate("/worker-register")}
          >
            Join as Service Provider →
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="join-right">

          <div className="worker-image">
            <img
              src={heroimg}
              alt="worker"
            />
          </div>

          <div className="stats-card">
            <h3>Why Work With Us?</h3>

            <div className="stats">
              <div>
                <h4>1200+</h4>
                <span>Requests</span>
              </div>
              <div>
                <h4>4.8★</h4>
                <span>Rating</span>
              </div>
              <div>
                <h4>₹25K+</h4>
                <span>Monthly</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default JoinUs;