import React, { useState, useEffect } from "react";

const Family = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [familyAnnouncements, setFamilyAnnouncements] = useState([]);
  const [complainText, setComplainText] = useState("");
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch the logged-in user from localStorage
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));

    if (userData && userData.role === "Family") {
      setLoggedInUser(userData);
    }

    // Example announcements data (could also be fetched from an API)
    const announcements = [
      "Community meeting on December 10th.",
      "Maintenance scheduled for elevators on December 15th.",
      "Monthly bills are due by December 20th.",
    ];

    setFamilyAnnouncements(announcements);

    // Fetch existing complaints from localStorage
    const storedComplaints = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(storedComplaints);
  }, []);

  const handleComplainSubmit = () => {
    if (!complainText.trim()) {
      alert("Please enter a valid complaint.");
      return;
    }

    const newComplaint = {
      id: complaints.length + 1,
      userId: loggedInUser.id,
      userName: loggedInUser.name,
      complaint: complainText,
      status: "Pending",
      date: new Date().toLocaleString(),
    };

    const updatedComplaints = [...complaints, newComplaint];
    setComplaints(updatedComplaints);
    localStorage.setItem("complaints", JSON.stringify(updatedComplaints));
    setComplainText(""); // Clear the input field
    alert("Your complaint has been submitted successfully.");
  };

  if (!loggedInUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="family-page">
      <header className="family-header">
        <h1>Welcome, {loggedInUser.name}</h1>
        <p>Role: {loggedInUser.role}</p>
      </header>

      <div className="family-content">
        <section className="family-profile">
          <h2>Your Profile</h2>
          <p>
            <strong>Name:</strong> {loggedInUser.name}
          </p>
          <p>
            <strong>Email:</strong> {loggedInUser.email}
          </p>
          <p>
            <strong>Role:</strong> {loggedInUser.role}
          </p>
        </section>

        <section className="family-announcements">
          <h2>Announcements</h2>
          <ul>
            {familyAnnouncements.map((announcement, index) => (
              <li key={index}>{announcement}</li>
            ))}
          </ul>
        </section>

        <section className="complain-section">
          <h2>Help or Complain</h2>
          <textarea
            value={complainText}
            onChange={(e) => setComplainText(e.target.value)}
            placeholder="Describe your issue or request..."
            className="complain-input"
          ></textarea>
          <button onClick={handleComplainSubmit} className="complain-button">
            Submit Complaint
          </button>

          <h3>Your Complaints</h3>
          <ul className="complaints-list">
            {complaints
              .filter((complaint) => complaint.userId === loggedInUser.id)
              .map((complaint) => (
                <li key={complaint.id}>
                  <p>
                    <strong>Complaint:</strong> {complaint.complaint}
                  </p>
                  <p>
                    <strong>Status:</strong> {complaint.status}
                  </p>
                  <p>
                    <strong>Date:</strong> {complaint.date}
                  </p>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Family;
