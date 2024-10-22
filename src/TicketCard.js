import React from "react";

function TicketCard({ ticket }) {
  const avatars = {
    "CAM-5": "profile-5",
    "CAM-8": "profile-8",
    "CAM-4": "AS",
    "CAM-2": "MG",
    // Add more avatars here as needed
  };

  const featureIcons = {
    "CAM-8": "wifi-signal", // Use Wi-Fi signal icon for CAM-8
    default: "circle-dots", // Use gray circle dots for other CAMs
  };

  return (
    <div className="ticket-card">
      <h3 className="ticket-id">{ticket.id}</h3> {/* Display CAM ID */}
      <h3 className="ticket-title">{ticket.title}</h3>
      <div className="ticket-info">
        <p className="ticket-feature-request">
          Feature Request{" "}
          <span
            className={featureIcons[ticket.id] || featureIcons.default}
          ></span>
        </p>
        <div className="ticket-avatar">
          <span className={avatars[ticket.id] || "default-avatar"}></span>{" "}
          {/* Avatar or Initials */}
        </div>
      </div>
      <p>
        <strong>Status:</strong> {ticket.status}
      </p>
      <p>
        <strong>Assigned to:</strong> {ticket.user || "Not Assigned"}
      </p>
      <p>
        <strong>Priority:</strong> {getPriorityLabel(ticket.priority)}
      </p>
    </div>
  );
}

// Helper function to convert priority number to label
function getPriorityLabel(priority) {
  switch (priority) {
    case 4:
      return "Urgent";
    case 3:
      return "High";
    case 2:
      return "Medium";
    case 1:
      return "Low";
    case 0:
      return "No Priority";
    default:
      return "Unknown";
  }
}

export default TicketCard;
