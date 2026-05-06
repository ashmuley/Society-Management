import "./Complaint.css";
import Navbar from "../components/Navbar";

function Complaint() {
  return (
    <>
    <Navbar/>
    
    <div className="complaint-page">
      <div className="complaint-card">
        <h2>Raise a Complaint</h2>
        <p className="complaint-subtitle">
          Facing an issue? Let us know and we’ll help resolve it quickly.
        </p>

        <div className="complaint-form">
          <select>
            <option>Complaint Type</option>
            <option>Worker Late</option>
            <option>Bad Behaviour</option>
            <option>Incomplete Work</option>
            <option>Wrong Charges</option>
            <option>Payment Issue</option>
            <option>Other</option>
          </select>

          <select>
            <option>Select Related Booking</option>
            <option>Electrician - 18 Apr - Pending</option>
            <option>Plumber - 20 Apr - Completed</option>
            <option>Cleaner - 22 Apr - Accepted</option>
          </select>

          <input
            type="text"
            placeholder="Complaint Title"
          />

          <textarea
            rows="5"
            placeholder="Describe your issue..."
          ></textarea>

          <button>Submit Complaint</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Complaint;