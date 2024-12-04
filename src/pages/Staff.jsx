import React, { useState, useEffect, useMemo } from "react";

const Staff = () => {
  const [attendance, setAttendance] = useState([]);
  const [currentLog, setCurrentLog] = useState({
    arrival: null,
    departure: null,
  });
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveRequest, setLeaveRequest] = useState({
    date: "",
    reason: "",
  });

  const loggedInUser = useMemo(() => {
    return JSON.parse(localStorage.getItem("loggedInUser"));
  }, []);

  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    const storedLeaveRequests = JSON.parse(localStorage.getItem("leaveRequests")) || {};

    setAttendance(storedAttendance);

    if (loggedInUser) {
      setLeaveRequests(storedLeaveRequests[loggedInUser.id] || []);
    }
  }, [loggedInUser]);

  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);

  const markArrival = () => {
    if (currentLog.arrival) {
      alert("Arrival time already marked.");
      return;
    }
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setCurrentLog((prev) => ({ ...prev, arrival: formattedTime }));
  };

  const markDeparture = () => {
    if (!currentLog.arrival) {
      alert("Please mark arrival time first.");
      return;
    }
    if (currentLog.departure) {
      alert("Departure time already marked.");
      return;
    }
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setCurrentLog((prev) => ({ ...prev, departure: formattedTime }));
  };

  const handleAttendanceSubmit = () => {
    if (!currentLog.arrival || !currentLog.departure) {
      alert("Please mark both arrival and departure times.");
      return;
    }
    setAttendance((prev) => [...prev, { ...currentLog, id: prev.length + 1 }]);
    setCurrentLog({ arrival: null, departure: null });
  };

  const handleLeaveRequestSubmit = () => {
    if (!leaveRequest.date || !leaveRequest.reason) {
      alert("Please fill in both the date and reason for leave.");
      return;
    }

    if (!loggedInUser) {
      alert("No logged-in user found.");
      return;
    }

    const newRequest = {
      ...leaveRequest,
      id: leaveRequests.length + 1,
      userId: loggedInUser.id,
      userName: loggedInUser.name,
      userEmail: loggedInUser.email,
      status: "Pending",
    };

    const storedLeaveRequests = JSON.parse(localStorage.getItem("leaveRequests")) || {};

    const updatedRequests = {
      ...storedLeaveRequests,
      [loggedInUser.id]: [...(storedLeaveRequests[loggedInUser.id] || []), newRequest],
    };

    localStorage.setItem("leaveRequests", JSON.stringify(updatedRequests));

    setLeaveRequests(updatedRequests[loggedInUser.id]);
    setLeaveRequest({ date: "", reason: "" });
  };

  return (
    <div className="staff-page">
      <h1>Staff Daily Activities</h1>

      <AttendanceSection
        currentLog={currentLog}
        attendance={attendance}
        markArrival={markArrival}
        markDeparture={markDeparture}
        handleAttendanceSubmit={handleAttendanceSubmit}
      />

      <LeaveSection
        leaveRequest={leaveRequest}
        leaveRequests={leaveRequests}
        handleLeaveRequestSubmit={handleLeaveRequestSubmit}
        setLeaveRequest={setLeaveRequest}
      />
    </div>
  );
};

const AttendanceSection = ({
  currentLog,
  attendance,
  markArrival,
  markDeparture,
  handleAttendanceSubmit,
}) => (
  <section className="attendance-section">
    <h2>Mark Attendance</h2>
    <div className="attendance-status">
      <p>Arrival Time: {currentLog.arrival || "Not marked"}</p>
      <p>Departure Time: {currentLog.departure || "Not marked"}</p>
    </div>
    <div className="attendance-actions">
      <div onClick={markArrival} className="attendance-action-btn">
        Mark Arrival
      </div>
      <div onClick={markDeparture} className="attendance-action-btn">
        Mark Departure
      </div>
      <button onClick={handleAttendanceSubmit}>Submit Attendance</button>
    </div>
    <h3>Attendance Logs</h3>
    <ul className="attendance-logs">
      {attendance.map((log) => (
        <li key={log.id}>
          Arrival: {log.arrival}, Departure: {log.departure}
        </li>
      ))}
    </ul>
  </section>
);

const LeaveSection = ({
  leaveRequest,
  leaveRequests,
  handleLeaveRequestSubmit,
  setLeaveRequest,
}) => (
  <section className="leave-section">
    <h2>Apply for Leave</h2>
    <div className="leave-form">
      <input
        type="date"
        value={leaveRequest.date}
        onChange={(e) =>
          setLeaveRequest((prev) => ({ ...prev, date: e.target.value }))
        }
        placeholder="Leave Date"
      />
      <textarea
        value={leaveRequest.reason}
        onChange={(e) =>
          setLeaveRequest((prev) => ({ ...prev, reason: e.target.value }))
        }
        placeholder="Reason for Leave"
      ></textarea>
      <button onClick={handleLeaveRequestSubmit}>Submit Leave Request</button>
    </div>
    <h3>Leave Requests</h3>
    <ul className="leave-requests">
      {leaveRequests.map((request) => (
        <li key={request.id}>
          Date: {request.date}, Reason: {request.reason}, Status: {request.status}
        </li>
      ))}
    </ul>
  </section>
);

export default Staff;
